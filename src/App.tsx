import ChatBox from "./components/ChatBox";
import Chat from "./components/Chat";
// import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import {
  ChatSession,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { TMessage } from "./types";
import QuickAction from "./components/QuickAction";

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

  const [chatHistory, setChatHistory] = useState<TMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const typeBoxRef = useRef(null);
  const [typeBoxRowSize, setTypeBoxRowSize] = useState<number | undefined>();

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

  chrome.runtime.onMessage.addListener((request) => {
    console.log("recieved message!");
    if (request.message === "new-consult") {
      console.log("message is new-consult");
      (async () => {
        const { selectionText } = await chrome.storage.local.get([
          "selectionText",
        ]);
        if (typeBoxRef.current) {
          const textarea = typeBoxRef.current as HTMLTextAreaElement;
          textarea.value += selectionText;
          const numRows = typeBoxRowSize
            ? textarea.scrollHeight / typeBoxRowSize
            : 1;
          textarea.rows = numRows < 4 ? numRows : 4;
        }
      })();
    }
  });

  const handleSubmit = () => {
    if (typeBoxRef.current) {
      const textarea = typeBoxRef.current as HTMLTextAreaElement;
      if (textarea.value.length > 0 && canSubmit) {
        const msg = textarea.value;
        // console.log(msg);
        setChatHistory([
          ...chatHistory,
          { parts: [{ text: msg, prompt: msg }], role: "user" },
        ]);
        // console.log(chat);
        textarea.value = "";
        textarea.rows = 1;
      }
    }
  };

  // const logDev = () => {
  // };

  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      {/* <button onClick={logDev}>DEV</button> */}
      <div className="w-full h-full bg-secondary flex flex-col justify-stretch items-center overflow-clip">
        <Chat
          chatHistory={chatHistory ? chatHistory : []}
          chatBot={chatBot}
          setCanSubmit={setCanSubmit}
          setLoading={setLoading}
          loading={loading}
        />
        <div className="relative w-full h-0">
          <QuickAction typeBoxRef={typeBoxRef} handleSubmit={handleSubmit} />
        </div>
        <div className="w-full h-auto">
          <ChatBox
            typeBoxRowSize={typeBoxRowSize}
            setTypeBoxRowSize={setTypeBoxRowSize}
            initialText={initialText}
            loading={loading}
            typeBoxRef={typeBoxRef}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
