import inquirer from 'inquirer';
import fs from 'node:fs/promises';
import readlineSync from 'readline-sync';
import colors from 'colors';
import openai from './src/config/open-ai.js';
import {viewSalesData, generateSalesConversation}  from './src/data/data.js'
import viewSummary from './src/summary/summarize.js';
import i18n from './internationalization/i18n.config.js';

const language = process.argv[2]

i18n.setLocale((language) ? language : 'en');

let selectedFile;
let selectedChatHistory;

// Function to select sample data file
async function selectSampleData() {
    const folderPath = './chats'; 
    try {
        const files = await fs.readdir(folderPath);
        if (files.length === 0) {
            console.log(i18n.__('NoFilesFound'));
            await new Promise(resolve => setTimeout(resolve, 2000));
            await mainMenu();
            return;
        }
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedFile',
                message: i18n.__('SelectFile'),
                choices: [...files, i18n.__('GoBack')]
            }
        ]);
        if (answers.selectedFile === i18n.__('GoBack')) {
            await mainMenu();
            return;
        }

        selectedFile = answers.selectedFile;
        selectedChatHistory = await fs.readFile(`./chats/${selectedFile}`, { encoding: 'utf8' });
        console.log(i18n.__('YouSelected'), answers.selectedFile);

        // return to menu
        await mainMenu();
    } catch (err) {
        console.error(i18n.__('ErrorReadingfile'), err);
        await mainMenu();
    }
}

// Function to ask questions about data
async function askQuestionsAboutData() {
    const chatHistory = []; 

    console.log(i18n.__('EnterInquiries'));
    try {
        // console.log(selectedChatHistory);
        const data = await fs.readFile(`./chats/${selectedFile}`, { encoding: 'utf8' });
        chatHistory.push(['user', data]);
    } catch (err) {
        console.log(colors.yellow(i18n.__('NoChatHistory')));
        await new Promise(resolve => setTimeout(resolve, 2000));
        return;
    }
    console.log(`${selectedChatHistory}\n\n`);
    // push the chat history to the list so the AI can injest the info.
    chatHistory.push(['user', selectedChatHistory]);

    // Loop to keep you in chat, typeing exit breaks out.
    while (true) {
        const userInput = readlineSync.question(colors.yellow(i18n.__('You')));
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
            if (userInput.toLowerCase() === i18n.__('Exit')) {
                console.log("exiting")
                break;
            }

            console.log(colors.green(i18n.__('Bot')) + completionText);

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
    console.log(i18n.getLocales())

    while(true) {
        // Clear the terminal screen
        console.clear();
        
        let fileNotificationText = `${i18n.__('CurrentSelectedFile')}${colors.green(selectedFile)}\n`;

        // Show the main menu
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: `${i18n.__('Welcome')}\n${(selectedFile) ? fileNotificationText : ``}\n${i18n.__('PleaseSelectAnOption')}`,
                choices: [i18n.__('GenerateSampleData'), i18n.__('SelectSampleData'), i18n.__('ViewSalesChat'), i18n.__('Summarize'), i18n.__('AskQuestions'), i18n.__('Exit')]
            }
        ]);

        // Switch statement that determines what menu Item does what
        // inquirer generates a object based on your selection, 
        // answers.<name> = choice
        switch (answers.option) {
            case i18n.__('GenerateSampleData'):
                console.log(i18n.__('GeneratingWait'))
                await generateSalesConversation();
                break;
            case i18n.__('SelectSampleData'):
                await selectSampleData();
                break;
            case i18n.__('ViewSalesChat'):
                await viewSalesData(selectedChatHistory);
                break;
            case i18n.__('Summarize'):
                await viewSummary(selectedChatHistory);
                break;
            case i18n.__('AskQuestions'):
                await askQuestionsAboutData();
                break;
            case i18n.__('Exit'):
                console.log(i18n.__('Exiting'));
                process.exit();
        }
    }
}

// Start the program
mainMenu();