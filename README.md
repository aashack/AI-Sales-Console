## AI Sales Analysis Project

------------

#### Project Description

This is a AI powered sales tool that allows you to use chatgpt to:
1. Generate Sample data with a randomizer, ensuring that no two generated text are the same, it then saves it to /chats directory to be used later.
1. Select from your generated sample data.
1. View your currently selected sample chat data.
1. Use AI to summarize your currently selected sample data.
1. With a selected Sample chat data, you can use a chatbot to ask questions against the data.


###### Language Support

When starting the project you can specify** 'es' **to enable **spanish** language support

>`npm start es`



#### Project Guidelines

**Generate Call Transcripts**
Create a script to generate sales call transcripts. The call transcripts should be outputted to the console and saved to a file for later use.

Here is an example of what a transcript format should look like:

    00:00:00 Sam (openai.com): Hey there Staya.
    00:00:02 Satya  (microsoft.com): Hi Sam, how are you?
    00:00:05 Sam (openai.com): I'm doing good. Do you think you can give us 10000 more GPUs?
    00:00:06 Satya (microsoft.com): I'm sorry Sam we can't do 10000, how about 5000?

**Summarize Call Transcripts**
Create a script that takes a transcript file name as input and generates a summary of the key points from the call transcript. Output the summary to the console.

**Answer Questions**
Create a script that takes a call transcript and a user question as command line arguments and answers the user’s question in relation to the call transcript. For example, it should answer a question like “What product was the customer interested in?”. Output the answer to the console.

------------

## Installation

1) Clone the project (If you require access please email aaron.jh.shack@gmail.com)
>`git clone git@github.com:aashack/AISales-momentum.git`

2) Install the dependencies
>`npm i`

3) Start the project
>`npm start // To run with default language settings`
>`npm start es // To run with spanish translations` 

## Thought process and pre-planning

I have been doing some exploratory research into the OpenAI library and testing different ways to approach this. I haven't pushed it up to github because I don't want to expose the details of the assignment.

I will be aproaching this challege by:

get existing chat bot to accept indexed Data
Learn about nodejs CLI tools (inquirer) ensuring that I can access sub menus.
Create and API to save chats to a database, I want the CLI tool to call the API to save the chat history.
Dockerize the whole application
Building Tasks
Create the CLI menu with selections and have it capable of running other scripts.
Using openAI create a prompt engine that will generate fake chat data, have the prompt select the data and topic at random to give variety and have it save to a file
Build a method to summarize a file that was generated, have a pre-made template prompt that will setup the organization structure
API to save the summary to the database
Have a chat to bot capability that will reference the sales chat
