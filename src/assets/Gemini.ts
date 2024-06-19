import {
    ChatSession,
  } from "@google/generative-ai";


export const sendPrompt = async (prompt: string, chatBot: ChatSession ) => {
    try {
    const result = await chatBot.sendMessage(prompt);
    console.log(result)
    return result.response.text()
    } catch (error) {
        console.error(error)
        return "There was an error sending the prompt. Please try again. Error code: " + error 
        //TODO: ACTUAL ERROR HANDLING
    }
}