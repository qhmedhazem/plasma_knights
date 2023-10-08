from datetime import datetime, timedelta

# date like dd-mm-yyyy


def get_times(start_date_str: str, end_date_str: str, duration_in_hours: int = 24):
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
    times = []

    while end_date > start_date:
        times.append([start_date, start_date + timedelta(hours=duration_in_hours)])
        start_date = start_date + timedelta(days=1)

    return times
