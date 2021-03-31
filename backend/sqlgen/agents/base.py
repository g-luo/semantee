from typing import Dict, Any

import mongoengine as me
from mongoengine import Document, StringField, DictField

from sqlgen.data.base import DataBase


class BaseAgent:

    def __init__(self, database: DataBase, model_cf: Dict[str, Any] = None):
        self.database = database
        self.model_cf = model_cf
        self.logger_db = me.connect('sqlgen')
        self.db_meta_info = self.database.get_meta_info()

        # create a new one if it doesn't exists
        DBInfo.objects(db_path=str(self.database.path)).update_one(content=self.db_meta_info,
                                                                   upsert=True)

    def get_sql(self, user_input: str) -> str:
        pass


class DBInfo(Document):
    db_path = StringField(required=True)
    content = DictField(DictField())
