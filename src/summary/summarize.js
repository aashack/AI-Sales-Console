import inquirer from 'inquirer';
import openai from '../config/open-ai.js';
import i18n from '../../internationalization/i18n.config.js';

// The AI prompt for generating a summary.
let summaryPrompt = 'write a summary about this chat between two people, it should be formatted with the Date at the top, the names of the participants, item being sold, original price, final price and time and place their meeting. at the bottom it should be short summary of the whole chat.'

/**
 * @param {String} prompt 
 * @param {String} data 
 * @returns A string summary of the chat data
 */
export const generateText = async (prompt, data) => {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: data },{ role: 'user', content: prompt }],
          });
          return completion.data.choices[0].message.content;
        // return result.data.choices[0].text.trim(); // Extract and return the generated text
    } catch (error) {
        if(error.response.status === 429) {
            console.error(colors.red('Too Many Requests, free tier chatgpt can only handle so many requests.'));
        }
    }
}

/**
 * 
 * @param {String} data - The Generated Sample chat
 * @returns 
 */
export const viewSummary = async (data) => {
    if(!data) {
        console.log(i18n.__('NoDataSelected'));
    } else {
        console.log(i18n.__('SummarySelectedChat'));

        if(i18n.getLocale() === 'es') {
            summaryPrompt += ' Language Spanish';
        }
        let summary = await generateText(summaryPrompt, data)
        console.log(`\n${summary}\n`);
    }

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'viewSummary',
            message: i18n.__('EnterGoBack'),
            choices: [i18n.__('GoBack')]
        }
    ]);

    if (answers.viewSalesData === i18n.__('GoBack')) {
        return;
    }
}


export default viewSummary;