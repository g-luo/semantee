from typing import Dict, Any
from pathlib import Path

class DataBase:

    def __init__(self, path: str):
        self.path = Path(path)

    @property
    def query_start(self):
        return ''

    def get_meta_info(self) -> Dict[str, Any]:
        pass

    def get_syntax_name(self):
        pass


    def run_command(self, command: str):
        pass