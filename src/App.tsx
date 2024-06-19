import ChatBox from "./components/ChatBox";
import Chat from "./components/Chat";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import {
  ChatSession,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { TMessage } from "./types";

const App = () => {
  const [canSubmit, setCanSubmit] = useState(true);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // TODO: SET UP SYSTEM INSTRUCTIONS HERE https://github.com/google-gemini/cookbook/blob/main/quickstarts/System_instructions.ipynb
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const generationConfig = {
    maxOutputTokens: 1000,
    temperature: 1,
  };

  const [chatBot, setChatBot] = useState<ChatSession>(model.startChat());
  const [initialText, setInitialText] = useState("");

  useEffect(() => {
    (async () => {
      const { openMethod, selectionText, pageContent } =
        await chrome.storage.local.get([
          "openMethod",
          "selectionText",
          "pageContent",
        ]);
      setChatBot(
        model.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text:
                    openMethod === "consult-context"
                      ? `In the future of this conversation, contextualize everything from the following website: \n ${pageContent[0].result}`
                      : "Hello!",
                },
              ],
            },
          ],
          generationConfig: generationConfig,
          safetySettings: safetySettings,
        })
      );
      setInitialText(selectionText);
    })();
  }, []);

  const [chatHistory, setChatHistory] = useState<TMessage[]>([]);
  const [loading, setLoading] = useState(false);

  // const logDev = () => {
  // };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* <button onClick={logDev}>DEV</button> */}
      <div className="w-full h-full bg-secondary flex flex-col justify-stretch items-center overflow-clip">
        <Chat
          chatHistory={chatHistory ? chatHistory : []}
          chatBot={chatBot}
          setCanSubmit={setCanSubmit}
          setLoading={setLoading}
          loading={loading}
        />
        <div className="w-full">
          <ChatBox
            setChatHistory={setChatHistory}
            initialText={initialText}
            chatHistory={chatHistory}
            canSubmit={canSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
