(function ($) {
  var reloadDuration = 0.16; // NOAA Scale reload duration in minutes.
  // The following is the NOAA Scales data service URL.
  var url = "products/noaa-scales.json";

  var noaaScaleDescriptors = {
    5: "Extreme",
    4: "Severe",
    3: "Strong",
    2: "Moderate",
    1: "Minor",
    0: "None",
    unknown: "No Data",
  };
  var noaaScaleTypes = {
    G: "Geomagnetic Storm",
    S: "Solar Radiation Storm",
    R: "Radio Blackout",
  };
  var noaaScaleEffects = {
    G5: '<span class="noaa_scale_info_effect">Power systems:</span> Widespread voltage control problems and protective system problems can occur, some grid systems may experience complete collapse or blackouts. Transformers may experience damage.<br>\
        <span class="noaa_scale_info_effect">Spacecraft operations:</span> May experience extensive surface charging, problems with orientation, uplink/downlink and tracking satellites.<br>\
        <span class="noaa_scale_info_effect">Other systems:</span> Pipeline currents can reach hundreds of amps, HF (high frequency) radio propagation may be impossible in many areas for one to two days, satellite navigation may be degraded for days, low-frequency radio navigation can be out for hours, and aurora has been seen as low as Florida and southern Texas (typically 40° geomagnetic lat.).',

    G4: '<span class="noaa_scale_info_effect">Power systems:</span> Possible  widespread voltage control problems and some protective systems will mistakenly trip out key assets from the grid.<br>\
        <span class="noaa_scale_info_effect">Spacecraft operations:</span> May experience surface charging and tracking problems, corrections may be needed for orientation problems.<br>\
        <span class="noaa_scale_info_effect">Other systems:</span> Induced pipeline currents affect preventive measures, HF radio propagation sporadic, satellite navigation degraded for hours, low-frequency radio navigation disrupted, and aurora has been seen as low as Alabama and northern California (typically 45° geomagnetic lat.).',
    G3: '<span class="noaa_scale_info_effect">Power systems:</span> Voltage corrections may be required, false alarms triggered on some protection devices.<br>\
        <span class="noaa_scale_info_effect">Spacecraft operations: </span> Surface charging may occur on satellite components, drag may increase on low-Earth-orbit satellites, and corrections may be needed for orientation problems.<br>\
        <span class="noaa_scale_info_effect">Other systems:</span> Intermittent satellite navigation and low-frequency radio navigation problems may occur, HF radio may be intermittent, and aurora has been seen as low as Illinois and Oregon (typically 50° geomagnetic lat.).',
    G2: '<span class="noaa_scale_info_effect">Power systems: </span>High-latitude power systems may experience voltage alarms, long-duration storms may cause transformer damage.<br>\
        <span class="noaa_scale_info_effect">Spacecraft operations: </span> Corrective actions to orientation may be required by ground control; possible changes in drag affect orbit predictions.<br>\
        <span class="noaa_scale_info_effect">Other systems: </span>HF radio propagation can fade at higher latitudes, and aurora has been seen as low as New York and Idaho (typically 55° geomagnetic lat.).',
    G1: '<span class="noaa_scale_info_effect">Power systems:</span> Weak power grid fluctuations can occur.<br>\
        <span class="noaa_scale_info_effect">Spacecraft operations:</span> Minor impact on satellite operations possible.<br>\
        <span class="noaa_scale_info_effect">Other systems: </span> Migratory animals are affected at this and higher levels; aurora is commonly visible at high latitudes (northern Michigan and Maine).',
    G0: "No G-Scale Geomagnetic Storming",
    Gunknown: "Data for this Space Weather Condition are currently missing.",

    S5: '<span class="noaa_scale_info_effect">Biological:</span> Unavoidable high radiation hazard to astronauts on EVA (extra-vehicular activity); passengers and crew in high-flying aircraft at high latitudes may be exposed to radiation risk.<br>\
        <span class="noaa_scale_info_effect">Satellite operations:</span> Satellites may be rendered useless, memory impacts can cause loss of control, may cause serious noise in image data, star-trackers may be unable to locate sources; permanent damage to solar panels possible.<br>\
        <span class="noaa_scale_info_effect">Other systems:</span> Complete blackout of HF (high frequency) communications possible through the polar regions, and position errors make navigation operations extremely difficult.',
    S4: '<span class="noaa_scale_info_effect">Biological:</span> Unavoidable radiation hazard to astronauts on EVA; passengers and crew in high-flying aircraft at high latitudes may be exposed to radiation risk.<br>\
        <span class="noaa_scale_info_effect">Satellite operations:</span> May experience memory device problems and noise on imaging systems; star-tracker problems may cause orientation problems, and solar panel efficiency can be degraded.<br>\
        <span class="noaa_scale_info_effect">Other systems:</span> Blackout of HF radio communications through the polar regions and increased navigation errors over several days are likely.',
    S3: '<span class="noaa_scale_info_effect">Biological:</span> Radiation hazard avoidance recommended for astronauts on EVA; passengers and crew in high-flying aircraft at high latitudes may be exposed to radiation risk.<br>\
        <span class="noaa_scale_info_effect">Satellite operations:</span> Single-event upsets, noise in imaging systems, and slight reduction of efficiency in solar panel are likely.<br>\
        <span class="noaa_scale_info_effect">Other systems:</span> Degraded HF radio propagation through the polar regions and navigation position errors likely.',
    S2: '<span class="noaa_scale_info_effect">Biological: </span> Passengers and crew in high-flying aircraft at high latitudes may be exposed to elevated radiation risk.<br>\
        <span class="noaa_scale_info_effect">Satellite operations:</span> Infrequent single-event upsets possible.<br>\
        <span class="noaa_scale_info_effect">Other systems:</span> Small effects on HF propagation through the polar regions and navigation at polar cap locations possibly affected.',
    S1: '<span class="noaa_scale_info_effect">Biological:</span> None.<br>\
        <span class="noaa_scale_info_effect">Satellite operations:</span> None.<br>\
        <span class="noaa_scale_info_effect">Other systems:</span> Minor impacts on HF radio in the polar regions.',
    S0: "No S-Scale Solar Radiation Storming",
    Sunknown: "Data for this Space Weather Condition are currently missing.",

    R5: '<span class="noaa_scale_info_effect">HF Radio:</span> Complete HF (high frequency) radio blackout on the entire sunlit side of the Earth lasting for a number of hours. This results in no HF radio contact with mariners and en route aviators in this sector.<br>\
        <span class="noaa_scale_info_effect">Navigation:</span> Low-frequency navigation signals used by maritime and general aviation systems experience outages on the sunlit side of the Earth for many hours, causing loss in positioning. Increased satellite navigation errors in positioning for several hours on the sunlit side of Earth, which may spread into the night side.',
    R4: '<span class="noaa_scale_info_effect">HF Radio:</span> HF radio communication blackout on most of the sunlit side of Earth for one to two hours. HF radio contact lost during this time.<br>\
        <span class="noaa_scale_info_effect">Navigation:</span> Outages of low-frequency navigation signals cause increased error in positioning for one to two hours. Minor disruptions of satellite navigation possible on the sunlit side of Earth.',
    R3: '<span class="noaa_scale_info_effect">HF Radio:</span> Wide area blackout of HF radio communication, loss of radio contact for about an hour on sunlit side of Earth.<br>\
        <span class="noaa_scale_info_effect">Navigation:</span> Low-frequency navigation signals degraded for about an hour.',
    R2: '<span class="noaa_scale_info_effect">HF Radio:</span> Limited blackout of HF radio communication on sunlit side, loss of radio contact for tens of minutes.<br>\
        <span class="noaa_scale_info_effect">Navigation:</span> Degradation of low-frequency navigation signals for tens of minutes.',
    R1: '<span class="noaa_scale_info_effect">HF Radio:</span> Weak or minor degradation of HF radio communication on sunlit side, occasional loss of radio contact.<br>\
        <span class="noaa_scale_info_effect">Navigation:</span> Low-frequency navigation signals degraded for brief intervals.',
    R0: "No R-Scale Radio Blackouts",
    Runknown: "Data for this Space Weather Condition are currently missing.",
  };

  var probHeader = {
    major_prob: "chance of an R3-R5 (Major) Radio Blackout",
    minor_prob: "chance of an R1-R2 (Minor) Radio Blackout",
    prob: "chance of an S1 or greater Solar Radiation Storm",
    major_prob_missing: "R3-R5 (Major) Radio Blackout forecast missing",
    minor_prob_missing: "R1-R2 (Minor) Radio Blackout forecast missing",
    prob_missing: "Solar Radiation Storm forecast missing",
  };

  var probEffect = {
    major_prob:
      "This is the forecast probability of a Radio Blackout of magnitude R3, R4, or R5 on the NOAA Space Weather Scales. For information on the expected impacts should an R3, R4, or R5 Radio Blackout occur, see:",
    minor_prob:
      "This is the forecast probability of a Radio Blackout of magnitude R1 or R2 on the NOAA Space Weather Scales. For information on the expected impacts should an R1 or R2 Radio Blackout occur, see:",
    prob: "This is the forecast probability of a Solar Radiation Storm occurring, meaning proton levels exceed the S1 (Minor) threshold on the NOAA Space Weather Scales.  For information on the expected impacts should a Solar Radiation Storm occur, see:",
    major_prob_missing: "",
    minor_prob_missing: "",
    prob_missing: "",
  };

  $(document).ready(function () {
    url = $("#dataservice_url").text() + "/" + url;

    $(".noaa_scale_slider").bxSlider({
      slideWidth: 300,
      minSlides: 1,
      maxSlides: 3,
      startSlide: 0,
      infiniteLoop: false,
      hideControlOnEnd: true,
      touchEnabled: true,
      moveSlides: 1,
    });

    $(".maximize").click(function () {
      $(".noaa_scale").toggle();
      $(".noaa_scale_mini").toggle();
    });

    $(".minimize").click(function () {
      $(".noaa_scale").toggle();
      $(".noaa_scale_mini").toggle();
    });

    (function worker() {
      $.getJSON(url, null, function (data) {
        for (var day_offset in data) {
          for (var key in data[day_offset]) {
            if (key.match(/^[r|s|g]$/i)) {
              /*
                MajorProb: null 
                MinorProb: null 
                Scale: "0" 
                Text: "none"
                Prob: null
*/

              var scale_val = data[day_offset][key]["Scale"];
              var scale_text = data[day_offset][key]["Text"];
              var minor_prob = data[day_offset][key]["MinorProb"];
              var major_prob = data[day_offset][key]["MajorProb"];
              var prob = data[day_offset][key]["Prob"];

              //Don't display a 0 NOAA scale value in the widget, just "G, S, R" not "G0, S0, R0"
              var scale_val_no_zero = scale_val;
              if (scale_val_no_zero == 0) {
                scale_val_no_zero = "";
              }

              // Set the NOAA Scale graphics.
              if (scale_val != null) {
                $(".noaa_scale_block.day_" + day_offset + ".scale_" + key)
                  .removeClass(
                    "noaa_scale_bg_unknown noaa_scale_bg_0 noaa_scale_bg_1 noaa_scale_bg_2 noaa_scale_bg_3 noaa_scale_bg_4 noaa_scale_bg_5"
                  )
                  .addClass("noaa_scale_bg_" + scale_val);

                $(".noaa_scale_value.day_" + day_offset + ".scale_" + key)
                  .removeClass(
                    "noaa_scale_fg_unknown noaa_scale_fg_0 noaa_scale_fg_1 noaa_scale_fg_2 noaa_scale_fg_3 noaa_scale_fg_4 noaa_scale_fg_5"
                  )
                  .addClass("noaa_scale_fg_" + scale_val);

                $(".noaa_scale_value.day_" + day_offset + ".scale_" + key).text(
                  key + scale_val_no_zero
                );
                $(
                  ".noaa_scale_description.day_" + day_offset + ".scale_" + key
                ).text(scale_text);
                (function () {
                  var local_key = key;
                  var local_scale_val = scale_val;
                  $(
                    ".noaa_scale_block.day_" + day_offset + ".scale_" + key
                  ).unbind("click");
                  $(
                    ".noaa_scale_block.day_" + day_offset + ".scale_" + key
                  ).click(function () {
                    showScalesInfo(local_key, local_scale_val);
                  });
                })();
              } else {
                $(".noaa_scale_block.day_" + day_offset + ".scale_" + key)
                  .removeClass(
                    "noaa_scale_bg_unknown noaa_scale_bg_0 noaa_scale_bg_1 noaa_scale_bg_2 noaa_scale_bg_3 noaa_scale_bg_4 noaa_scale_bg_5"
                  )
                  .addClass("noaa_scale_bg_unknown");

                $(".noaa_scale_value.day_" + day_offset + ".scale_" + key)
                  .removeClass(
                    "noaa_scale_fg_unknown noaa_scale_fg_0 noaa_scale_fg_1 noaa_scale_fg_2 noaa_scale_fg_3 noaa_scale_fg_4 noaa_scale_fg_5"
                  )
                  .addClass("noaa_scale_fg_unknown");

                $(".noaa_scale_value.day_" + day_offset + ".scale_" + key).text(
                  key
                );
                $(
                  ".noaa_scale_description.day_" + day_offset + ".scale_" + key
                ).text("no data");
                (function () {
                  $(
                    ".noaa_scale_block.day_" + day_offset + ".scale_" + key
                  ).unbind("click");
                  $(
                    ".noaa_scale_block.day_" + day_offset + ".scale_" + key
                  ).click(function () {
                    showScalesInfo(key, "unknown");
                  });
                })();
              }

              // Set the probabilities values.
              if (minor_prob != null) {
                $(".minor_prob.day_" + day_offset).text(
                  sprintf("%.0f%%", minor_prob)
                );
                (function () {
                  var probability = minor_prob;
                  $("#minor_prob_day_" + day_offset).unbind("click");
                  $("#minor_prob_day_" + day_offset).click(function () {
                    showProbInfo(probability, "minor_prob");
                  });
                })();
              } else if (key.toLowerCase() == "r") {
                $(".minor_prob.day_" + day_offset).text("--");
                (function () {
                  $("#minor_prob_day_" + day_offset).unbind("click");
                  $("#minor_prob_day_" + day_offset).click(function () {
                    showProbInfo(-1, "minor_prob_missing");
                  });
                })();
              }

              if (major_prob != null) {
                $(".major_prob.day_" + day_offset).text(
                  sprintf("%.0f%%", major_prob)
                );
                (function () {
                  var probability = major_prob;
                  $("#major_prob_day_" + day_offset).unbind("click");
                  $("#major_prob_day_" + day_offset).click(function () {
                    showProbInfo(probability, "major_prob");
                  });
                })();
              } else if (key.toLowerCase() == "r") {
                $(".major_prob.day_" + day_offset).text("--");
                (function () {
                  $("#major_prob_day_" + day_offset).unbind("click");
                  $("#major_prob_day_" + day_offset).click(function () {
                    showProbInfo(-1, "major_prob_missing");
                  });
                })();
              }

              if (prob != null) {
                $(".prob.day_" + day_offset).text(sprintf("%.0f%%", prob));
                (function () {
                  var probability = prob;
                  $("#prob_day_" + day_offset).unbind("click");
                  $("#prob_day_" + day_offset).click(function () {
                    showProbInfo(probability, "prob");
                  });
                })();
              } else if (key.toLowerCase() == "s") {
                $(".prob.day_" + day_offset).text("--");
                (function () {
                  $("#prob_day_" + day_offset).unbind("click");
                  $("#prob_day_" + day_offset).click(function () {
                    showProbInfo(-1, "prob_missing");
                  });
                })();
              }
            }

            // Set the datestamps where required.
            if (key.match(/^datestamp$/i)) {
              var datestamp = data[day_offset][key];
              var dateparts = datestamp.split("-");
              var time_t = Date.UTC(
                parseInt(dateparts[0]),
                parseInt(dateparts[1]) - 1,
                parseInt(dateparts[2])
              );
              var label_str = $(".noaa_scale_block_title.day_" + day_offset);

              // Set empty NOAA Scale title blocks.
              if (label_str.is(":empty")) {
                var date_str = strftimeUTC(
                  "Predicted %F UTC",
                  new Date(time_t)
                );
                $(".noaa_scale_block_title.day_" + day_offset).text(date_str);
              }
            }
          }
        }
      });
      setTimeout(worker, reloadDuration * 60000);
    })();
  });

  function showScalesInfo(key, scale_val) {
    var scale_val_no_zero = scale_val;
    if (scale_val_no_zero == 0) {
      scale_val_no_zero = "";
    }

    $(".noaa_scale_info_header")
      .removeClass(
        "noaa_scale_bg_unknown noaa_scale_bg_0 noaa_scale_bg_1 noaa_scale_bg_2 noaa_scale_bg_3 noaa_scale_bg_4 noaa_scale_bg_5"
      )
      .addClass("noaa_scale_bg_" + scale_val);

    if (scale_val != "unknown") {
      $("#noaa_scale_info_header").html(
        key +
          scale_val_no_zero +
          " (" +
          noaaScaleDescriptors[scale_val] +
          ") " +
          noaaScaleTypes[key] +
          " Impacts"
      );
    } else {
      $("#noaa_scale_info_header").html("Missing Data");
    }

    $("#noaa_scale_info_effect").html(noaaScaleEffects[key + scale_val]);

    $(function () {
      $("#noaa_scale_info").slideDown();
    });
  }

  function showProbInfo(probability, prob_type) {
    $(".noaa_scale_info_header").removeClass(
      "noaa_scale_bg_unknown noaa_scale_bg_0 noaa_scale_bg_1 noaa_scale_bg_2 noaa_scale_bg_3 noaa_scale_bg_4 noaa_scale_bg_5"
    );

    if (probability < 0) {
      $(".noaa_scale_info_header").addClass("noaa_scale_bg_unknown");
    }

    $("#noaa_scale_info_header").html(
      sprintf("%.0f%% ", probability) + probHeader[prob_type]
    );

    $("#noaa_scale_info_effect").html(probEffect[prob_type]);

    $(function () {
      $("#noaa_scale_info").slideDown();
    });
  }

  $(document).mouseup(function (e) {
    if (
      $(".noaa_scale_info_close .close").is(e.target) ||
      (!$(".noaa_scale_block .close").is(e.target) &&
        $(".noaa_scale_block").has(e.target).length === 0 &&
        !$("#noaa_scale_info").is(e.target) &&
        $("#noaa_scale_info").has(e.target).length === 0)
    ) {
      $("#noaa_scale_info").hide();
    }
  });
})(jQuery);
