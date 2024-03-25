
# This isn't completed yet

### AISales-momentum
An application that leverages OpenAI GPT APIs to generate and analyze sales call transcripts.

### Preamble
I have been doing some exploratory research into the OpenAI library and testing different ways to approach this. I haven't pushed it up to github because I don't want to expose the details of the assignment.

I will be aproaching this challege by:

1) get existing chat bot to accept indexed Data
2) Learn about nodejs CLI tools (inquirer) ensuring that I can access sub menus.
3) Create and API to save chats to a database, I want the CLI tool to call the API to save the chat history.
4) Dockerize the whole application


### Building Tasks
1) Create the CLI menu with selections and have it capable of running other scripts.
2) Using openAI create a prompt engine that will generate fake chat data, have the prompt select the data and topic at random to give variety and have it save to a file
3) Build a method to summarize a file that was generated, have a pre-made template prompt that will setup the organization structure
4) API to save the summary to the database
5) Have a chat to bot capability that will reference the sales chat




In order to get this running it is just

1) create an .env file and add your OpenAI token
2) npm i
3) npm start
