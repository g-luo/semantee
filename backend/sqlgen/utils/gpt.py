"""Creates the Example and GPT classes for a user to interface with the OpenAI API."""

import openai


def set_openai_key(key):
    """Sets OpenAI key."""
    openai.api_key = key

class Example():
    """Stores an input, output pair and formats it to prime the model."""

    def __init__(self, inp, out):
        self._input = inp
        self._output = out

    @property
    def input(self):
        """Returns the input of the example."""
        return self._input

    @property
    def output(self):
        """Returns the intended output of the example."""
        return self._output

    def format(self):
        """Formats the input, output pair."""
        return f"input: {self._input}\noutput: {self._output}\n"


class GPT:
    """The main class for a user to interface with the OpenAI API.
    A user can add examples and set parameters of the API request."""

    def __init__(self, completion_kwargs, query_start: str = ''):
        self.examples = []
        self.gpt_kwargs = completion_kwargs
        self._response_history = []
        self._instr = ""
        self.query_start = query_start

    @property
    def last_response(self):
        if self._response_history:
            return self._response_history[-1]
        else:
            print('There is nothing in the response history.')

    @property
    def instr(self):
        return self._instr

    @instr.setter
    def instr(self, instr: str):
        self._instr = f"Instruction: {instr}"

    def add_example(self, ex):
        """Adds an example to the object. Example must be an instance
        of the Example class."""
        assert isinstance(ex, Example), "Please create an Example object."
        self.examples.append(ex.format())

    def get_prime_text(self):
        """Formats all examples to prime the model."""
        return f'{self.instr}\n' + '\n'.join(self.examples)


    def craft_query(self, input: str = ""):
        """Creates the query for the API request."""
        if input:
            return self.get_prime_text() + "\ninput: " + input + f"\noutput: {self.query_start}"
        return self.get_prime_text()

    def submit_request(self, user_input):
        """Calls the OpenAI API with the specified parameters."""
        response = openai.Completion.create(prompt=self.craft_query(user_input),
                                            **self.gpt_kwargs)
        self._response_history.append(response)
        return response

    def get_top_reply(self, prompt):
        """Obtains the best result as returned by the API."""
        response = self.submit_request(prompt)
        return response['choices'][0]['text']