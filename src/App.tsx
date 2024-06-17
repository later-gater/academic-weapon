import ChatBox from "./components/ChatBox";
import Chat from "./components/Chat";
import Header from "./components/Header";
import { useState } from "react";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import { TMessage } from "./types";

const App = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // TODO: SET UP SYSTEM INSTRUCTIONS HERE https://github.com/google-gemini/cookbook/blob/main/quickstarts/System_instructions.ipynb

  const [chatBot] = useState<ChatSession>(
    model.startChat({
      // history: [
      //   {
      //     role: "user",
      //     parts: [{ text: "Hello, I have 2 dogs in my house." }],
      //   },
      //   {
      //     role: "model",
      //     parts: [
      //       { text: "Great to meet you. What would you like to know?" },
      //     ],
      //   },
      // ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    })
  );
  const [chatHistory, setChatHistory] = useState<TMessage[]>([]);

  // const logDev = () => {
  // };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* <button onClick={logDev}>DEV</button> */}
      <div className="w-full h-full bg-secondary flex flex-col justify-stretch items-center overflow-clip">
        <Chat chatHistory={chatHistory ? chatHistory : []} chatBot={chatBot} />
        <div className="w-full">
          <ChatBox setChatHistory={setChatHistory} chatHistory={chatHistory} />
        </div>
      </div>
    </div>
  );
};

export default App;
