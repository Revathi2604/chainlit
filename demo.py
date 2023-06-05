import chainlit as cl

port = 8000

@cl.on_message  # this function will be called every time a user inputs a message in the UI
def main(message: str):
    # this is an intermediate step
    cl.send_message(author="Tool 1", content=f"Response from tool1", indent=1)

    # send back the final answer
    cl.send_message(content=f"This is the final answer")