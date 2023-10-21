import matplotlib.pyplot as plt
import pandas as pd
from datetime import timedelta, datetime
from matplotlib.axes import Axes
import matplotlib.dates as md
import matplotlib.colors as mcolors
import base64
import io
import mplcursors

DEFAULT_PLOTTED_COLUMNS = ["kp"]
BAR_COLUMNS = ["kp"]


def get_kp_color(kp: float):
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


def plot_bar_data(ax: Axes, column_name: str, series: pd.Series):
    try:
        for i in series.index:
            start = i
            end = series.index[series.index.get_loc(i) + 1]
            result = series[start:end]
            # color = css4_colors[i % len(css4_colors)]
            ax.bar(
                start,
                float(series[start:end].values[0]),
                width=end - start,
                align="edge",
                color=mcolors.CSS4_COLORS[get_kp_color(float(result.values[0]))],
            )
    except Exception as e:
        print(e)


def plot_imported_data(
    data: pd.DataFrame,
    duration: timedelta,
    columns_to_plot: list[str] = DEFAULT_PLOTTED_COLUMNS,
):
    try:
        plt.close()
    except Exception:
        pass

    print(columns_to_plot)
    fig, axs = plt.subplots(len(columns_to_plot), 1, sharex="all", figsize=(15, 15))
    title = (
        "Space Weather Prediction Analysis between "
        + (datetime.now() - duration).strftime("%d/%m/%Y %H:%M:%S")
        + " and "
        + datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    )
    if len(columns_to_plot) == 1:
        axs.set_title(title)
    else:
        axs[0].set_title(title)

    data = data.sort_index()

    for ax_index in range(len(columns_to_plot)):
        ax: plt.Axes = None
        if len(columns_to_plot) == 1:
            ax = axs
        else:
            ax = axs[ax_index]

        if columns_to_plot[ax_index] in BAR_COLUMNS:
            plot_bar_data(
                ax, columns_to_plot[ax_index], data[columns_to_plot[ax_index]]
            )

        ax.xaxis.set_ticklabels([])
        x_format = md.DateFormatter("%d/%m \n %H:%M")
        ax.xaxis.set_major_formatter(x_format)
        ax.set_ylabel(columns_to_plot[ax_index], color="r")
        ax.set_ylim(0, 9)
        plt.gcf().autofmt_xdate()
        ax.grid()

    io_path = io.BytesIO()
    fig.set_size_inches(1270 / 100, 720 / 100)
    plt.savefig(
        io_path,
        format="jpg",
    )
    io_path.seek(0)
    img = base64.b64encode(io_path.read()).decode()

    def show_plot():
        plt.show()

    def close_plot():
        plt.close()

    return (img, show_plot, close_plot)
