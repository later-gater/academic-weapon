import ChatBox from "./components/ChatBox";
import Chat from "./components/Chat";
import Header from "./components/Header";
import { useState } from "react";
import { TMessage } from "./types";
// import Gemini from "./components/Gemini";

const App = () => {
  const [chat, setChat] = useState<TMessage[]>([]);

  // const logDev = () => {
  //   console.log(import.meta.env.VITE_GEMINI_API_KEY);
  // }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* <button onClick={logDev}>DEV</button>
      <Gemini /> */}
      <div className="w-full h-full bg-secondary flex flex-col justify-stretch items-center overflow-clip">
        <Chat chat={chat} />
        <div className="w-full">
          <ChatBox chat={chat} setChat={setChat} />
        </div>
      </div>
    </div>
  );
};

export default App;
