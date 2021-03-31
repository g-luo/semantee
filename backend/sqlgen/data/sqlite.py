from typing import List, Dict, Any

from sqlgen.data.base import DataBase
import sqlite3

class SqliteData(DataBase):

    def __init__(self, path: str):
        super(SqliteData, self).__init__(path)
        self._conn = get_connection(path)
        self._cursor = self._conn.cursor()

    @property
    def query_start(self):
        return 'SELECT'

    def run_command(self, command: str):
        self._cursor.execute(command)
        return self._cursor.fetchall()

    def get_meta_info(self) -> Dict[str, Any]:
        tables = self._get_tables()

        meta_info = {}
        for tb_name in tables:
            meta_info[tb_name] = tb_meta = {}
            cols = self.run_command(f'PRAGMA table_info({tb_name})')
            for col in cols:
                tb_meta[col[1]] = dict(
                    type=col[2]
                )
        return meta_info

    def get_syntax_name(self):
        return 'Sqlite'

    def _get_tables(self) -> List[str]:
        ret = self.run_command("SELECT name FROM sqlite_master WHERE type='table'")
        return [x[0] for x in ret]


def get_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Exception as e:
        print(e)

    if conn is None:
        raise ValueError(f'Connection to Sqlite db {db_file} could not be established')

    return conn


if __name__ == '__main__':
    test_data = 'data/flight_company.sqlite'
    db = SqliteData(test_data)
    # meta_info = db.get_meta_info()
    foo = db.run_command("SELECT * FROM sqlite_master")
    print(foo)
    breakpoint()
