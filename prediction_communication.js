require("dotenv").config();

const isDev =
  process.env.NODE_ENV?.trim() === "development" ||
  process.env.NODE_ENV?.trim() === '"development"';
const isProd = !isDev;

const child_process = require("node:child_process");
const events = require("node:events");

class Predictior extends events.EventEmitter {
  constructor() {
    super();
    this.process = null;
    this._last_sent_event = null;
    // this.createProcess();
  }

  getLastEvent() {
    return this._last_sent_event;
  }

  destroy() {
    if (this.process) {
      // this.process.kill();
      this.process.stdin.write('{"cmd":"exit"}\n');
    }
  }

  plot() {
    // return console.log("NOT AVILABLE ON SERVER SIDE ANALYZER");
    if (this.process) {
      this.process.stdin.write('{"cmd":"plot"}\n');
    }
  }
  showPlot() {
    if (this.process) {
      this.process.stdin.write('{"cmd":"plot"}\n');
    }
  }

  async requestPlotImg(data) {
    if (this.process) {
      this.process.stdin.write(
        JSON.stringify({
          cmd: "request_plot_img",
          data: data,
        }) + "\n"
      );
    }

    return new Promise((resolve, reject) => {
      const handler = (packet) => {
        if (packet?.data?.event === "plot_img_approved" && packet.data?.data) {
          console.log(packet?.data?.event);
          this.removeListener("packet", handler);
          return resolve(packet.data?.data?.img);
        }
      };

      this.on("packet", handler);
      setTimeout(() => {
        this.removeListener("packet", handler);
        return reject("Timeout");
      }, 10000);
    });
  }

  requestParamaters() {
    if (this.process) {
      this.process.stdin.write('{"cmd":"paramaters"}\n');
    }
  }

  createProcess(duration) {
    if (this.process) {
      this.process.kill();
      this.process = null;
    }

    let args = [];

    if (duration) {
      args.push("--duration");
      args.push(duration);
    }

    if (isProd) {
      this.process = child_process.spawn("./predictior/predictior.exe", args);
    } else {
      this.process = child_process.spawn("py", [
        "./predictior/main.py",
        ...args,
      ]);
    }

    this.process.on("spawn", () => {
      this.emit("packet", {
        event: "spawn",
        data: "Process spawned",
      });
    });

    this.process.on("error", (err) => {
      console.log(err.message);
      this.emit("packet", {
        event: "error",
        // error: err.message,
        data: "There was an error with the process.",
      });
    });

    this.process.stderr.on("data", (data) => {
      console.log(data.toString("utf-8"));
      this.emit("packet", {
        event: "error",
        // error: data.toString("utf-8"),
        data: "There was an error with the process.",
      });
    });

    this.process.on("exit", (code, signal) => {
      console.log(`Process exited with code ${code} and signal ${signal}`);
      this.emit("exit");

      if (code !== null) {
        this.emit("packet", {
          event: "exit",
          data: code,
        });
      }

      this.process = null;
    });

    this.process.stdout.on("data", (data) => {
      let msgs = data
        .toString("utf-8")
        .split("\n")
        .filter((msg) => !!msg);

      for (let msg of msgs) {
        let packet;
        try {
          packet = JSON.parse(msg.trim());
        } catch {
          continue;
        }
        console.log(
          "event: ",
          packet?.event,
          packet?.event === "error" ? packet?.data : ""
        );

        if (packet?.data?.event === "finished") {
          this._last_sent_event = packet;
        }

        this.emit("packet", {
          event: "message",
          data: packet,
        });
      }
    });
  }
}

module.exports = Predictior;
