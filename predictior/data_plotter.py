import matplotlib.pyplot as plt
import pandas as pd
from datetime import timedelta, datetime
from matplotlib.axes import Axes
import matplotlib.dates as md
import matplotlib.colors as mcolors
import base64
import io

DEFAULT_PLOTTED_COLUMNS = ["kp", ["bt", "bx_gsm"], "by_gsm"]
BAR_COLUMNS = ["kp"]

index_to_colors = ["b", "g", "r", "c", "m", "y", "k", "w"]


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


def plot_kp_bar_data(ax: Axes, column_name: str, series: pd.Series, c_index: int = 0):
    if c_index == 1:
        ax = ax.twinx()
    elif c_index > 1:
        print("Maximum allowed relationships parameters is 2!")
        return
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
        x_format = md.DateFormatter("%d/%m \n %H:%M")
        ax.xaxis.set_major_formatter(x_format)
        ax.set_ylabel(column_name, color=index_to_colors[c_index])

    except Exception as e:
        print(e)


def plot_to_ax(ax: Axes, column_name: str, data: pd.DataFrame, c_index: int = 0):
    if c_index == 1:
        ax = ax.twinx()
    elif c_index > 1:
        print("Maximum allowed relationships parameters is 2!")
        return

    ax.plot(
        data[column_name],
        "-o",
        markersize=0,
        label=column_name,
        color=index_to_colors[c_index],
        linewidth=1,
    )

    x_format = md.DateFormatter("%d/%m \n %H:%M")
    ax.xaxis.set_major_formatter(x_format)
    ax.set_ylabel(column_name, color=index_to_colors[c_index])


def plot_imported_data(data: list[dict], duration: timedelta):
    try:
        plt.close()
    except Exception:
        pass

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

    ax_index = 0
    for d_index in range(len(data)):
        d = data[d_index]
        d["data"].dropna()
        for c_index in range(len(d["columns_to_plot"])):
            column = d["columns_to_plot"][c_index]
            ax: plt.Axes = None
            if len(data) == 1:
                ax = axs
            else:
                ax = axs[ax_index]

            if isinstance(column, list):
                for c_index in range(len(column)):
                    if column[c_index] in BAR_COLUMNS:
                        plot_kp_bar_data(
                            ax,
                            column[c_index],
                            d["data"][column[c_index]],
                            c_index=c_index,
                        )
                    else:
                        plot_to_ax(
                            ax=ax,
                            column_name=column[c_index],
                            data=d["data"],
                            c_index=c_index,
                        )
            else:
                if column in BAR_COLUMNS:
                    plot_kp_bar_data(
                        ax,
                        column,
                        d["data"][column],
                        c_index=c_index,
                    )
                else:
                    plot_to_ax(
                        ax=ax, column_name=column, data=d["data"], c_index=c_index
                    )
        ax_index += 1

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
