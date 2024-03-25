import { getRandomFirstName, getRandomItem, getRandomCurrency, getRandomCanadianCity, getRandomPopularWebsite} from '../data/sampleData.js'
import openai from '../config/open-ai.js';
import fs from 'node:fs/promises';
 

export const gptPrompt = async () => {
    let nameOne = getRandomFirstName();
    let nameTwo = getRandomFirstName();
    return {
        prompt: `Can you create some fake chat history, it should be two people discussing the sale of new or used ${getRandomItem()}. It should include some haggling and agreeing to a set price in ${getRandomCurrency()}. Each chat message should be formatted like this: <Time> Name (website): message. The chat should between ${nameTwo} at ${getRandomPopularWebsite()} and ${nameOne} from ${getRandomPopularWebsite()} and they both live in ${getRandomCanadianCity()}.`,
        nameOne,
        nameTwo
    }
}

export const generateText = async (prompt) => {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
          });
          return completion.data.choices[0].message.content;
        // return result.data.choices[0].text.trim(); // Extract and return the generated text
    } catch (error) {
        console.log(error);
    }
}

export const saveToFile = async (data, fileName) => {

    try {
        fs.writeFile(`./chats/${fileName}.txt`, data, (err) => { if (err) throw err; });

        // await fs.writeFileSync(`${fileName}`, data);
        console.log(`Data saved to ${fileName}`);
    } catch (error) {
        console.error(`Error saving data to ${fileName}:`, error);
    }
}

export const generateAndSaveData = async (prompt, fileName) => {
    try {
        const generatedText = await generateText(prompt);
        await saveToFile(generatedText, fileName);
    } catch (error) {
        console.error('Error:', error);
    }
}

export const generateSalesConversation = async () => {

    let newPrompt;
    let result;
    newPrompt = await gptPrompt();
    result = await generateText(newPrompt.prompt)

    await saveToFile(result, `${newPrompt.nameOne}-${newPrompt.nameTwo}-sale`);

}

export default generateSalesConversation