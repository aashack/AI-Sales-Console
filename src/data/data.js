import { getRandomFirstName, getRandomItem, getRandomCurrency, getRandomCanadianCity, getRandomPopularWebsite} from './sampleData.js'
import openai from '../config/open-ai.js';
import fs from 'node:fs/promises';
import inquirer from 'inquirer';
import i18n from '../../internationalization/i18n.config.js';

const chatFolderPath = '../../chats'; 

/**
 * A randomized prompt used for chatGPT, it pulls values from a randomizer to add variety
 * @returns It returns an object because I needed the names to save their files (unique name)
 * {
 *  prompt: String
 *  nameOne: String
 *  nameTwo: String
 * 
 * }         
 */
export const gptPrompt = async () => {
    let nameOne = getRandomFirstName();
    let nameTwo = getRandomFirstName();
    return {
        prompt: `Can you create some fake chat history, it should be two people discussing the sale of new or used ${getRandomItem()}. It should include some haggling and agreeing to a set price in ${getRandomCurrency()}. Each chat message should be formatted like this: <Time> Name (website): message. The chat should between ${nameTwo} at ${getRandomPopularWebsite()} and ${nameOne} from ${getRandomPopularWebsite()} and they both live in ${getRandomCanadianCity()}.`,
        nameOne,
        nameTwo
    }
}

/**
 * 
 * @param {String} prompt - the pregenerated prompt 
 * @returns Several lines of dialog outlining a Sale
 */
export const generateText = async (prompt) => {
    if(i18n.getLocale() === 'es') {
        prompt += ' Language Spanish';
    }

    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
          });
          return completion.data.choices[0].message.content;
    } catch (error) {
        if(error.response.status === 429) {
            console.error(colors.red('Too Many Requests, free tier chatgpt can only handle so many requests.\nTry generating again.'));
        }
    }
}


/**
 * 
 * @param {String} data - the generated sample sales chat
 * @param {String fileName - filename that consists of the users names
 */
export const saveToFile = async (data, fileName) => {
    try {
        fs.writeFile(`./chats/${fileName}.txt`, data, (err) => { if (err) throw err; });
    } catch (error) {
        console.error(`Error saving data to ${fileName}:`, error);
    }
}

/**
 * 
 * @param {String} filename - filename that consists of the users names
 * @returns String - A list of sales chatter
 */
export const getFileData = async (filename) => {
    const data = await fs.readFile(`./chats/${filename}`, { encoding: 'utf8' });
    return data;
}

export const viewSalesData = async (data) => {
    console.log(i18n.__('CurrentlySelected'));

    if(!data) {
        console.log(i18n.__('NoData'));
    } else {
        console.log(`\n${data}\n`);
    }

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'viewSalesData',
            message: i18n.__('EnterGoBack'),
            choices: [i18n.__('EnterGoBack')]
        }
    ]);

    if (answers.viewSalesData === i18n.__('EnterGoBack')) {
        return;
    }
}

/**
 * Igress Method that will generate and save some sample data
 */
export const generateSalesConversation = async () => {
    let newPrompt;
    let result;
    newPrompt = await gptPrompt();
    result = await generateText(newPrompt.prompt)

    await saveToFile(result, `${newPrompt.nameOne}-${newPrompt.nameTwo}-sale-${i18n.getLocale()}`);
}


export default { generateSalesConversation, viewSalesData };