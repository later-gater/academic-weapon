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
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are a browser extension named Academic Weapon. Your goal is to help the user understand the article or website they are visiting. Make your responses reasonably short; if the user wants you to elaborate they will specify it.",
  });
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
        console.log("selectionText: ", selectionText);
        if (typeBoxRef.current) {
          const textarea = typeBoxRef.current as HTMLTextAreaElement;
          textarea.value = selectionText;
          onChange();
        }
      })();
    }
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const onChange = () => {
    if (typeBoxRef.current) {
      const textarea = typeBoxRef.current as HTMLTextAreaElement;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

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
        onChange();
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
          <QuickAction
            typeBoxRef={typeBoxRef}
            handleSubmit={handleSubmit}
            setSubmitDisabled={setSubmitDisabled}
          />
        </div>
        <div className="w-full h-auto">
          <ChatBox
            onChange={onChange}
            submitDisabled={submitDisabled}
            setSubmitDisabled={setSubmitDisabled}
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
