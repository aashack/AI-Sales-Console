## AI Sales Analysis Project

------------

#### Project Description

This is a AI powered sales tool that allows you to use chatgpt to:
1. Generate Sample data with a randomizer, ensuring that no two generated text are the same, it then saves it to /chats directory to be used later.
1. Select from your generated sample data.
1. View your currently selected sample chat data.
1. Use AI to summarize your currently selected sample data.
1. With a selected Sample chat data, you can use a chatbot to ask questions against the data.


##### Generated Chat files

When you generate a new chat file, the language will default to english. If you started the application with spanish all generated files will be in spanish with a designation in the filename

- Aaron-Katya-sale-en.txt - English
- Katya-Aaron-sale-es.txt - Spanish
- They should save in the root project directory inside /chats

If you load a spanish chat file while using english translations you can still generate an english summary, and ask it questions in english. If you load a english chat file while using spanish translations you can generate a spanish summary and ask it questions in spanish.


### You will need to add an .ENV file with a valid API key to chatGPT

- If you are using free tier, you will need to pace your commands to the AI portion, the free tier doesn't allow rapid multiple commands.
- You can remove the 'sample' from the 'sample.env' file and replace the contents with your API_KEY

###### Language Support

When starting the project you can specify** 'es' **to enable **spanish** language support. Specifying nothing or en will start it in english.

>`npm start es` spanish

>`npm start en` english

>`npm start` english

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

3) Setup your .env file with your openAI Key, you can modify sample.env for the format.
   
4) Start the project
>`npm start // To run with default language settings`

>`npm start es // To run with spanish translations` 

## Thought process, pre-planning and AI usage

I have been doing some exploratory research into the OpenAI library and testing different ways to approach this. I haven't pushed it up to github because I don't want to expose the details of the assignment. But I basically broke up the project into four parts.

1) Generate a new file with the AI chat.
2) Feed chat data to a chatbot and have it know the chat contents to answer questions.
3) Use AI to generate a summary.
4) Create a menu system to navigate the program and the generated files.

#### AI Usage

I mainly avoided using AI to generate the main code, but I did use it for translating text to spanish in the **es.json** file, generate test data arrays in sampleData.js and translate the **ITEMS** array into spanish.

#### I will be aproaching this challege by:

- Get existing chat bot i have written to accept indexed Data
- Learn about nodejs CLI tools (inquirer) ensuring that I can access sub menus.
- Research and discover a way to incorperate another language.

#### Building Tasks
- Create the CLI menu with selections and have it capable of running other scripts.
- Using openAI create a prompt engine that will generate fake chat data, have the prompt select the data and topic at random to give variety and have it save to a file
- Build a method to summarize a file that was generated, have a pre-made template prompt that will setup the organization structure
- Have a chat to bot able to reference the sales chat


This was testing using both MacOS and Windows Powershell.

Node version: v21.6.1

NPM verison: 10.2.4

