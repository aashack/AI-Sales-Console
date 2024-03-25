import inquirer from 'inquirer';
import fs from 'node:fs/promises';
import { exec } from 'child_process';
import readlineSync from 'readline-sync';
import colors from 'colors';
import openai from './src/config/open-ai.js';
import generateSalesConversation  from './src/data/generateSampleData.js'

let selectedFile;
let currentChatHistory = [];

// Function to select sample data file
async function selectSampleData() {
    const folderPath = './chats'; // Change this to your folder path
    try {
        const files = await fs.readdir(folderPath);
        if (files.length === 0) {
            console.log("No files found in the folder.");
            await mainMenu();
            return;
        }
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedFile',
                message: 'Select a file:',
                choices: [...files, 'Go back']
            }
        ]);
        if (answers.selectedFile === 'Go back') {
            await mainMenu();
            return;
        }

        selectedFile = answers.selectedFile;
        console.log("You selected:", answers.selectedFile);
        // You can perform actions with the selected file here
        await mainMenu();
    } catch (err) {
        console.error("Error reading folder:", err);
        await mainMenu();
    }
}

// Function to ask questions about data
async function askQuestionsAboutData() {
    currentChatHistory = [];
    const chatHistory = []; 
    const directoryPath = '/chats';
    let data = [];
    console.log("Asking questions about data...");
    try {
        const data = await fs.readFile(`./chats/${selectedFile}`, { encoding: 'utf8' });
        chatHistory.push(['user', data]);
      } catch (err) {
        console.log('No Chat history has been selected');
        currentChatHistory = [];
        return;
      }
      const indexName = 'my-data-index';
      chatHistory.push(['user', data]);
      while (true) {
        
        const userInput = readlineSync.question(colors.yellow('You: '));
    
        try {
          // Construct messages by iterating over the history
          const messages = chatHistory.map(([role, content]) => ({
            role,
            content,
          }));

          console.log(messages)
          // console.log(messages)
          // Add latest user input
          messages.push({ role: 'user', content: userInput });
          
          // Call the API gpt-3.5-turbo is the free tier, you need to pay to use GPT-4
          const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
          });
    
          // Get completion text/content
          let completionText = completion.data.choices[0].message.content;
    
          // type exit to break out of the nodejs program
          if (userInput.toLowerCase() === 'exit') {
            console.log("exiting")
            break;
          }
    
          console.log(colors.green('Bot: ') + completionText);
    
          // Update history with user input and assistant response
          chatHistory.push(['user', userInput]);
          chatHistory.push(['assistant', completionText]);
        } catch (error) {
          console.error(colors.red(error));
          console.log(process.env.OPENAI_API_KEY)
        }
      }
      currentChatHistory = messages
    await mainMenu();
}

// Main menu
async function mainMenu() {
    while(true) {
        // Clear the terminal screen
        console.clear();
        
        let fileNotificationText = `Current Selected file: ${selectedFile}\n`;
        let chatHistoryText = `You Currently a saved chat, starting a new chat will override existing one\n`;

        // Show the main menu
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: `\nWelcome to this ChatGPT Sales Analyzer\n${(selectedFile) ? fileNotificationText : ``}\n${(currentChatHistory.length !== 0) ? chatHistoryText : ``}\nPlease select an option from below: `,
                choices: ['Generate Sample Data', 'Select Sample Data', 'Ask Questions About Data', 'Exit']
            }
        ]);

        switch (answers.option) {
            case 'Generate Sample Data':
                console.log("Generating Sample Sales, Please Wait")
                await generateSalesConversation();
                break;
            case 'Select Sample Data':
                await selectSampleData();
                break;
            case 'Ask Questions About Data':
                await askQuestionsAboutData();
                break;
            case 'Exit':
                console.log('Exiting...');
                return;
        }
    }
}

// Start the program
mainMenu();