import { useEffect, useRef } from "react";
import { TMessage } from "../types";
import { ChatSession } from "@google/generative-ai";

const Chat = ({
  chatHistory,
  chatBot,
}: {
  chatHistory: TMessage[];
  chatBot: ChatSession;
}) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //respond to chat message
    (async () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
      if (
        chatHistory.length > 0 &&
        lastMessageRef.current &&
        scrollRef.current
      ) {
        const prompt = chatHistory[chatHistory.length - 1];
        if (prompt.role === "user") {
          lastMessageRef.current.textContent = "";
          const result = await chatBot.sendMessageStream(prompt.parts[0].text);
          let response: TMessage = {
            parts: [],
            role: "model",
          };
          chatHistory.push(response);
          for await (const chunk of result.stream) {
            const scroll =
              scrollRef.current.scrollTop === scrollRef.current.scrollHeight - scrollRef.current.clientHeight
                ? true
                : false;
            const chunkText = chunk.text();
            response.parts = [...response.parts, { text: chunkText }];
            lastMessageRef.current.textContent += chunkText;
            if (scroll) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          }
          console.log(chatHistory);
        }
      }
    })();
  }, [chatHistory]);

  return (
    <div
      ref={scrollRef}
      className="w-full flex h-full flex-col px-5 py-2 overflow-y-scroll text-white scroll-smooth"
    >
      {/* TODO: MAKE PRETTY SCROLLBAR */}
      {chatHistory.map((msg, index) => {
        return (
          <div
            key={index}
            className={`${
              msg.role === "user"
                ? "bg-primary self-end max-w-[75%]"
                : "self-start max-w-[90%]"
            } px-3 py-1 rounded-3xl m-1  break-words`}
          >
            {msg.parts.map((obj) => obj.text).join("")}
          </div>
        );
      })}
      <div
        ref={lastMessageRef}
        className="self-start max-w-[90%] px-3 py-1 rounded-3xl m-1  break-words"
      ></div>
      <div id="end-of-chat" className="py-4"></div>
    </div>
  );
};

export default Chat;
