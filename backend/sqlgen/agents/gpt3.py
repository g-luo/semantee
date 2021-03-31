from mongoengine import Document, StringField, DictField, BooleanField

import os
import  sqlgen.utils.gpt as gpt
from sqlgen.agents.base import BaseAgent

DEBUG = os.environ.get("DEBUG", False)

class GPT3Agent(BaseAgent):

    def __init__(self, *args, **kwargs):
        super(GPT3Agent, self).__init__(*args, **kwargs)


    def get_sql(self, user_input: str) -> str:
        interaction = GPT3InteractionDB(user_input=user_input, db_path=str(self.database.path))
        instr =  f"Given an input question, respond with syntactically correct " \
                 f"{self.database.get_syntax_name()}. Be creative but the SQL must be correct " \
                 f"finishing with ;. "

        table_names = list(self.db_meta_info.keys())
        tables_str = ','.join(table_names)
        instr += f"Only use tables called {tables_str}. "

        for table in table_names:
            schema_str = ','.join([f'{col} ({v["type"]})' for col, v \
                                   in self.db_meta_info[table].items()])
            instr += f"The {table} table has columns: {schema_str}. "

        # adjusting gpt3 settings
        gpt_kwargs = dict(engine='davinci-instruct-beta', temperature=0.3, max_tokens=100,
                          top_p=1, n=1, stream=False, stop=[';', 'input:'])
        gpt_interface = gpt.GPT(gpt_kwargs, query_start=self.database.query_start)
        gpt_interface.instr = instr

        # record interaction's instruction
        interaction["gpt3_setting"] = gpt_kwargs
        interaction["instruction"] = instr

        # submit openai request
        # response = gpt_interface.submit_request(user_input)
        if DEBUG:
            response = gpt_interface.craft_query(user_input)
            interaction["gpt3_response"] = {'r': response}
            interaction.save()
            return response

        response = gpt_interface.submit_request(user_input)
        interaction["gpt3_response"] = response
        interaction.executed = False
        # save interaction to db
        interaction.save()

        command = response.choices[0].text
        command = f'{self.database.query_start} {command};'
        if command:
            try:
                results = self.database.run_command(command)
                msg = f'[command] {command}'
                if results:
                    interaction.update(executed=True)
                    results_str = '\n'.join([str(res) for res in results])
                    msg = f'{msg}\n{results_str}'
                return msg
            except Exception as e:
                err_msg = f"[command] {command} \n" \
                          f"[Error] {str(e)}"
                return err_msg

        return 'gpt3 model failed'


class GPT3InteractionDB(Document):
    user_input = StringField(required=True)
    db_path = StringField(required=True, max_length=70)
    instruction = StringField(required=True)
    gpt3_setting = DictField(required=True)
    gpt3_response = DictField(required=True) # TODO: we may not want to keep this?
    executed = BooleanField()


if __name__ == '__main__':

    from sqlgen.data.sqlite import SqliteData
    test_data = 'data/flight_company.sqlite'
    db = SqliteData(test_data)
    agent = GPT3Agent(db)
    request = agent.get_sql('Show me the tables and their columns.')
    print(request)