from datetime import datetime, timedelta
import numpy as np
import pandas as pd
import logging


from utils.convert_to_lmn import hybrid_mva, get_side_data_v_and_b
from tests.lmn.lmn_logical_tests import (
    b_largest_in_l_direction,
    multiple_tests,
    walen_test,
)

minimum_walen = 0.95
maximum_walen = 1.123


def lmn_testing(data: pd.DataFrame, event_date: datetime) -> bool:
    """
    Merges all the LMN tests together for an event. Returns true if the LMN tests are passed
    :param imported_data: data to test on
    :param event_date: possible event date
    :param minimum_walen: minimum walen fraction
    :param maximum_walen: maximum walen fraction
    :return:
    """
    # try:
    data.dropna(inplace=True)
    mva_interval, outside_interval, inside_interval, min_len = 30, 10, 2, 70

    if len(data) < min_len:
        return False

    L, M, N = hybrid_mva(
        data,
        event_date,
        outside_interval=outside_interval,
        inside_interval=inside_interval,
        mva_interval=mva_interval,
    )
    b1, b2, v1, v2 = get_side_data_v_and_b(
        data,
        event_date,
        outside_interval=outside_interval,
        inside_interval=inside_interval,
    )
    # print(
    #     "LMN:",
    #     L,
    #     M,
    #     N,
    #     np.dot(L, M),
    #     np.dot(L, N),
    #     np.dot(M, N),
    #     np.dot(np.cross(L, M), N),
    # )

    b1_L, b1_M, b1_N = np.dot(L, b1), np.dot(M, b1), np.dot(N, b1)
    b2_L, b2_M, b2_N = np.dot(L, b2), np.dot(M, b2), np.dot(N, b2)
    v1_L, v1_M, v1_N = np.dot(L, v1), np.dot(M, v1), np.dot(N, v1)
    v2_L, v2_M, v2_N = np.dot(L, v2), np.dot(M, v2), np.dot(N, v2)
    b1_changed, b2_changed = np.array([b1_L, b1_M, b1_N]), np.array([b2_L, b2_M, b2_N])
    v1_changed, v2_changed = np.array([v1_L, v1_M, v1_N]), np.array([v2_L, v2_M, v2_N])
    b1_L, b2_L, b1_M, b2_M = b1_changed[0], b2_changed[0], b1_changed[1], b2_changed[1]
    v1_L, v2_L = v1_changed[0], v2_changed[0]

    data_1 = data[
        event_date
        - timedelta(minutes=outside_interval) : event_date
        - timedelta(minutes=inside_interval)
    ]
    data_2 = data[
        event_date
        + timedelta(minutes=inside_interval) : event_date
        + timedelta(minutes=outside_interval)
    ]

    rho_1, rho_2 = np.mean(data_1["n_p"].values), np.mean(data_2["n_p"].values)

    if not b_largest_in_l_direction(b1_L, b2_L, b1_M, b2_M):
        return False
    if not multiple_tests(b1, b2, v1, v2, data, event_date, L):
        return False
    if not walen_test(
        b1_L, b2_L, v1_L, v2_L, rho_1, rho_2, minimum_walen, maximum_walen
    ):
        return False
    return True
    # except ValueError:
    #     print(f'value error for event {event_date}')
