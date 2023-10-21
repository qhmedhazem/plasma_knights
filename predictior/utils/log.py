import os
import sys

sys.stdout.reconfigure(line_buffering=True)

# # Disable stdout buffering
# if sys.stdout.isatty():
#     # If running in a terminal, don't buffer stdout
# else:
#     # If not running in a terminal, use Python's -u option to unbuffer stdout
#     os.environ["PYTHONUNBUFFERED"] = "1"


def log(data):
    print(data + "\n\n")
    sys.stdout.flush()
    return data
