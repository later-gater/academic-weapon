import { useEffect, useRef, useState } from "react";
import { SiGooglegemini } from "react-icons/si";
import { TMessage } from "../types";
import { ChatSession } from "@google/generative-ai";
import { sendPrompt } from "../assets/Gemini";
import Markdown from "react-markdown";
import { IconContext } from "react-icons";

type chatProps = {
  chatHistory: TMessage[];
  chatBot: ChatSession;
  setCanSubmit: (canSubmit: boolean) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
};

const Chat = ({
  chatHistory,
  chatBot,
  setCanSubmit,
  setLoading,
  loading,
}: chatProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolling, setScrolling] = useState(true);

  const onResize = new ResizeObserver(() => {
    if (scrolling) {
      scrollRef.current!.scrollTop =
        scrollRef.current!.scrollHeight - scrollRef.current!.clientHeight;
    }
  });

  for (const child of scrollRef.current?.children || []) {
    onResize.observe(child);
  }

  useEffect(() => {
    // Define the scroll event handler
    const handleScroll = () => {
      if (
        scrollRef.current &&
        scrollRef.current.scrollTop ===
          scrollRef.current.scrollHeight - scrollRef.current.clientHeight
      ) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Add the event listener to the scrollRef.current element
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    // Clean up function to remove the event listener
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  //TODO: SLOWLY ADD NEW TEXT FROM RESPONSE.

  useEffect(() => {
    //respond to chat message
    (async () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
      if (chatHistory.length > 0 && scrollRef.current) {
        const prompt = chatHistory[chatHistory.length - 1];
        if (prompt.role === "user") {
          setCanSubmit(false);
          setLoading(true);
          let reply: string;
          if (prompt.parts[0].prompt) {
            reply = await sendPrompt(prompt.parts[0].prompt, chatBot);
          } else {
            reply = await sendPrompt(prompt.parts[0].text, chatBot);
          }
          chatHistory.push({ parts: [{ text: reply }], role: "bot" });
          setLoading(false);
          setCanSubmit(true);
        }
      }
    })();
  }, [chatHistory]);

  return (
    <div
      ref={scrollRef}
      className="w-full flex h-full flex-col px-5 py-2 overflow-y-auto overflow-x-clip text-white scroll-smooth chat-scrollbar"
    >
      {chatHistory.map((msg, index) => {
        return (
          <div
            key={index}
            className={`${
              msg.role === "user"
                ? "bg-primary self-end max-w-[75%]"
                : "self-start max-w-[90%]"
            } px-3 py-1 rounded-3xl m-1 break-words`}
          >
            <Markdown className="whitespace-pre-wrap break-words text-wrap overflow-x-auto">
              {msg.parts.map((obj) => obj.text).join("")}
            </Markdown>
          </div>
        );
      })}

      <div className="flex">
        {loading && (
          <>
            <IconContext.Provider
              value={{
                className: `ml-3 mr-0.5 my-1 animate-bounce [animation-delay:_0] [animation-timing-function:_ease]`,
              }}
            >
              <SiGooglegemini />
            </IconContext.Provider>
            <IconContext.Provider
              value={{
                className: `mr-0.5 my-1 animate-bounce [animation-delay:_0.15s] [animation-timing-function:_ease]`,
              }}
            >
              <SiGooglegemini />
            </IconContext.Provider>
            <IconContext.Provider
              value={{
                className: `my-1 animate-bounce [animation-delay:_0.3s] [animation-timing-function:_ease]`,
              }}
            >
              <SiGooglegemini />
            </IconContext.Provider>
          </>
        )}
      </div>

      <div id="end-of-chat" className="py-4"></div>
    </div>
  );
};

export default Chat;
