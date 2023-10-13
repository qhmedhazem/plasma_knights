import matplotlib.pyplot as plt
import pandas as pd
from datetime import timedelta, datetime
import matplotlib.dates as md
import matplotlib.colors as mcolors


def get_kb_color(kp: float):
    if kp < 5:
        return "cornflowerblue"
    if kp >= 5 and kp < 6:
        return "lightgreen"
    if kp >= 6 or kp < 7:
        return "khaki"
    if kp >= 7 or kp < 8:
        return "orange"
    if kp >= 8:
        return mcolors["red"]


def plot_imported_data(
    data: [dict[str, pd.DataFrame | str | datetime]],
    duration: timedelta,
):
    fig, axs = plt.subplots(len(data), 1, sharex="all", figsize=(15, 15))
    title = (
        "Space Weather Prediction Analysis between "
        + (datetime.now() - duration).strftime("%d/%m/%Y %H:%M:%S")
        + " and "
        + datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    )
    if len(data) == 1:
        axs.set_title(title)
    else:
        axs[0].set_title(title)

    for ax_index in range(len(data)):
        ax: plt.Axes = None
        if len(data) == 1:
            ax = axs
        else:
            ax = axs[ax_index]

        print(data[ax_index]["df"])
        d: pd.Series = data[ax_index]["df"]
        d = d.sort_index()

        ax.xaxis.set_ticklabels([])
        for i in d.index:
            try:
                start = i
                end = d.index[d.index.get_loc(i) + 1]
                result = d[start:end]
                # color = css4_colors[i % len(css4_colors)]
                ax.bar(
                    start,
                    float(result.values[0]),
                    width=end - start,
                    align="edge",
                    color=mcolors.CSS4_COLORS[get_kb_color(float(result.values[0]))],
                )
            except Exception as e:
                print(e)

        x_format = md.DateFormatter("%d/%m \n %H:%M")
        ax.xaxis.set_major_formatter(x_format)
        ax.set_ylabel(data[ax_index]["name"], color="r")
        # ax.set_ylim(0, 10)
        plt.gcf().autofmt_xdate()
        ax.grid()

    plt.show()
