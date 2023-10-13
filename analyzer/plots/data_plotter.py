from datetime import datetime
from typing import List, Optional, Union, Tuple
import matplotlib.pyplot as plt
import matplotlib.dates as md
from matplotlib.axes import Axes
import matplotlib.colors as mcolors
import pandas as pd
import numpy as np
import base64
import io
from mpl_toolkits.mplot3d import Axes3D

DEFAULT_PLOTTED_COLUMNS = [
    # "IMF",
    # "n_p",  # proton number density
    # # ("Tp_perp", "Tp_par"),
    # "Bt"
    "Bx",
    "By",
    "Bz",
    # ("Bt", "vp_magnitude"),
]


def plot_imported_data(
    imported_data: pd.DataFrame,
    start_date: datetime,
    end_date: datetime,
    columns_to_plot: List[Union[str, Tuple[str, str]]] = DEFAULT_PLOTTED_COLUMNS,
    save=False,
    event_date: Optional[datetime] = None,
    boundaries: Optional[List[datetime]] = None,
    scatter_points: Optional[list] = None,
    probe="OMNI",
):
    """
    Plots given set of columns for a given ImportedData
    :param imported_data: ImportedData
    :param columns_to_plot: list of column names
    :param save: if True, saves generated plot instead of showing
    :param event_date: date of event to be marked on plot, None if no event to be indicated
    :param boundaries: boundaries of the event to be indicated on plot, None if no boundaries to be indicated
    :param scatter_points: points to be scattered on the plots
    :return:
    """
    try:
        plt.close()
    except Exception:
        pass

    fig, axs = plt.subplots(len(columns_to_plot), 1, sharex="all", figsize=(15, 15))
    colours = ["g", "b"] + plt.rcParams["axes.prop_cycle"].by_key()["color"]
    if len(columns_to_plot) == 1:
        axs.set_title(
            "Probe "
            + str(probe)
            + " between "
            + start_date.strftime("%d/%m/%Y")
            + " and "
            + end_date.strftime("%d/%m/%Y")
        )
        # axs.set_title("Hi")
    else:
        axs[0].set_title(
            "Probe "
            + str(probe)
            + " between "
            + start_date.strftime("%d/%m/%Y")
            + " and "
            + end_date.strftime("%d/%m/%Y")
        )
        # axs[0].set_title("Hi")
    imported_data.dropna(inplace=True)
    for ax_index in range(len(columns_to_plot)):
        subplot_plot_count = 0
        if len(columns_to_plot) == 1:
            ax = axs
        else:
            ax = axs[ax_index]

        if isinstance(columns_to_plot[ax_index], str):
            column_to_plot = columns_to_plot[ax_index]
            plot_to_ax(
                imported_data,
                ax=ax,
                column_name=column_to_plot,
                colour=colours[subplot_plot_count],
            )
        else:
            assert (
                len(columns_to_plot[ax_index]) == 2
            ), "Can only create 2 plots per subplot, not %s. Thank you." % len(
                columns_to_plot[ax_index]
            )
            for column_to_plot in columns_to_plot[ax_index]:
                plot_to_ax(
                    imported_data,
                    ax=ax,
                    column_name=column_to_plot,
                    colour=colours[subplot_plot_count],
                )

                if subplot_plot_count == 0:
                    if column_to_plot != "Tp_perp" and column_to_plot != "Tp_par":
                        ax = ax.twinx()  # creates new ax which shares x
                    else:
                        ax = fig.add_subplot(
                            int(str(len(columns_to_plot)) + str(1) + str(ax_index + 1)),
                            sharey=ax,
                            frameon=False,
                        )
                        ax.xaxis.set_ticklabels([])
                    subplot_plot_count += 1

                if scatter_points is not None:
                    for scatter_point in scatter_points:
                        if scatter_point[0] == column_to_plot:
                            ax.scatter(scatter_point[1], scatter_point[2])

        # if imported_data.get("possible_events") is not None:
        #     for i in imported_data["possible_events"].index:
        #         if imported_data["possible_events"][i] == 1:
        #             ax.axvline(
        #                 x=i, linewidth=0.5, color=mcolors.CSS4_COLORS["lightcoral"]
        #             )

        if imported_data.get("lmn_approved_events") is not None:
            for i in imported_data["lmn_approved_events"].index:
                if imported_data["lmn_approved_events"][i] == 1:
                    ax.axvline(x=i, linewidth=0.5, color="r")

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


def create_vp_magnitude_column(data: pd.DataFrame) -> pd.DataFrame:
    data["vp_magnitude"] = np.sqrt(
        (data["vp_x"]) ** 2 + (data["vp_y"]) ** 2 + (data["vp_z"]) ** 2
    )
    return data


def create_bt_column(data: pd.DataFrame) -> pd.DataFrame:
    data["Bt"] = np.sqrt((data["Bx"]) ** 2 + (data["By"]) ** 2 + (data["Bz"]) ** 2)
    return data


def plot_to_ax(imported_data, ax: Axes, column_name: str, colour="b"):
    """
    Plots given column of given ImportedData to a given ax.
    :param imported_data: ImportedData
    :param ax: matplotlib ax
    :param column_name: str
    :param colour: matplotlib color
    :return:
    """
    if column_name not in imported_data.columns.values:
        imported_data = create_vp_magnitude_column(imported_data)
        imported_data = create_bt_column(imported_data)

    if column_name == "possible_events_sum" or column_name == "lmn_approved_events_sum":
        ax.bar(
            imported_data.index,
            imported_data[column_name],
            color="violet",
            edgecolor="white",
            width=1,
            linewidth=0.7,
        )

    else:
        ax.plot(
            imported_data[column_name],
            "-o",
            markersize=0,
            label=column_name,
            color=colour,
            linewidth=1,
        )
    x_format = md.DateFormatter("%d/%m \n %H:%M")
    ax.xaxis.set_major_formatter(x_format)
    if column_name == "Tp_par":
        ax.yaxis.set_label_position("right")
        ax.xaxis.set_ticklabels([])
    ax.set_ylabel(tex_escape(column_name), color=colour)
    ax.grid()


def tex_escape(name: str):
    if "_" in name:
        spot = name.index("_")
        normal = name[:spot]
        subscript = name[spot + 1 :]
        name = (
            r"${}_{{{}}}$".format(normal, subscript)
            + "\n"
            + r"$ ({})$".format(get_units(name))
        )
        return name
    else:
        if get_units(name) != "":
            return r"${}$".format(name) + "\n" + r"$ ({})$".format(get_units(name))
        else:
            return r"${}$".format(name)


def get_units(name):
    if name in ["Bx", "By", "Bz", "Bl", "Bm", "Bn", "Bt"]:
        unit = "nT"
    elif name in ["vp_x", "vp_y", "vp_z", "vl", "vm", "vn", "vp_magnitude"]:
        unit = "km s^{-1}"
    elif name == "n_p":
        unit = "cm^{-3}"
    else:
        unit = ""
    return unit


# if __name__ == "__main__":
#     data = get_classed_data(probe=1, start_date="19/01/1979", start_hour=20, duration=3)
#     plot_imported_data(
#         data,
#         columns_to_plot=DEFAULT_PLOTTED_COLUMNS,
#         boundaries=[datetime(1979, 1, 19, 21, 27)],
#     )
