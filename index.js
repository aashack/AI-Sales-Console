import inquirer from 'inquirer';
import fs from 'node:fs/promises';
import readlineSync from 'readline-sync';
import colors from 'colors';
import openai from './src/config/open-ai.js';
import {viewSalesData, generateSalesConversation}  from './src/data/data.js'
import viewSummary from './src/summary/summarize.js';

let selectedFile;
let selectedChatHistory;

// Function to select sample data file
async function selectSampleData() {
    const folderPath = './chats'; 
    try {
        const files = await fs.readdir(folderPath);
        if (files.length === 0) {
            console.log("No files found in the folder.\nGenerate Some Data to get started.");
            await new Promise(resolve => setTimeout(resolve, 2000));
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
        selectedChatHistory = await fs.readFile(`./chats/${selectedFile}`, { encoding: 'utf8' });
        console.log("You selected:", answers.selectedFile);

        // return to menu
        await mainMenu();
    } catch (err) {
        console.error("Error reading folder/file:", err);
        await mainMenu();
    }
}

// Function to ask questions about data
async function askQuestionsAboutData() {
    const chatHistory = []; 

    console.log("\nEnter your inquiries about this Sale:\n\n");
    try {
        // console.log(selectedChatHistory);
        const data = await fs.readFile(`./chats/${selectedFile}`, { encoding: 'utf8' });
        chatHistory.push(['user', data]);
    } catch (err) {
        console.log(colors.yellow('No Chat history has been selected'));
        await new Promise(resolve => setTimeout(resolve, 2000));
        return;
    }
    console.log(`${selectedChatHistory}\n\n`);
    // push the chat history to the list so the AI can injest the info.
    chatHistory.push(['user', selectedChatHistory]);

    // Loop to keep you in chat, typeing exit breaks out.
    while (true) {
        const userInput = readlineSync.question(colors.yellow('You: '));
        try {
            // Construct messages by iterating over the history
            const messages = chatHistory.map(([role, content]) => ({
                role,
                content,
            }));
            
            /**
                CreateChatCompletion - the format for the chat is
                user: message  - for use inputs
                assistant: message - for ai bot response
                consistently adding bother user and ai message history injects the 
                info back so it can be references persistently
             */
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
        }
    }
    await mainMenu();
}
// Main menu 
async function mainMenu() {
    while(true) {
        // Clear the terminal screen
        console.clear();
        
        let fileNotificationText = `\nCurrent Selected file: ${colors.green(selectedFile)}\n`;

        // Show the main menu
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: `\nWelcome to this ChatGPT Sales Analyzer\n${(selectedFile) ? fileNotificationText : ``}\nPlease select an option from below: `,
                choices: ['Generate Sample Data', 'Select Sample Data', 'View Sales Chat', 'Summarize', 'Ask Questions About Data', 'Exit']
            }
        ]);

        // Switch statement that determines what menu Item does what
        // inquirer generates a object based on your selection, 
        // answers.<name> = choice
        switch (answers.option) {
            case 'Generate Sample Data':
                console.log("Generating Sample Sales, Please Wait")
                await generateSalesConversation();
                break;
            case 'View Sales Chat':
                await viewSalesData(selectedChatHistory);
                break;
            case 'Select Sample Data':
                await selectSampleData();
                break;
            case 'Summarize':
                await viewSummary(selectedChatHistory);
                break;
            case 'Ask Questions About Data':
                await askQuestionsAboutData();
                break;
            case 'Exit':
                console.log('Exiting...');
                process.exit();
        }
    }
}

// Start the program
mainMenu();