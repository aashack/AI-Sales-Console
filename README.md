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

------------

## Installation

1) Clone the project (If you require access please email aaron.jh.shack@gmail.com)
   
>`git clone git@github.com:aashack/AI-Sales-Console.git`

2) Install the dependencies

>`npm i`

3) Setup your .env file with your openAI Key, you can modify sample.env for the format.
   
4) Start the project
>`npm start // To run with default language settings`

>`npm start es // To run with spanish translations` 


This was testing using both MacOS and Windows Powershell.

Node version: v21.6.1

NPM verison: 10.2.4

