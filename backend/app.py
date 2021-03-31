from sqlgen.agents.gpt3 import GPT3Agent
from sqlgen.data.sqlite import SqliteData

from flask import Flask, render_template, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

# app.static_folder = 'static'
# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/get')
def get_response():
    user_input = request.args.get('msg')
    db = SqliteData('data/flight_company.sqlite')
    agent = GPT3Agent(db)
    response = agent.get_sql(user_input)
    return response

if __name__ == '__main__':
    app.run()