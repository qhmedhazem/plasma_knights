import sqlite3


database = sqlite3.connect("database.db")
cursor = database.cursor()

cursor.execute(
    """CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY,
          name TEXT,
          age INTEGER
    )"""
)
