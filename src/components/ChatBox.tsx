import { FaArrowCircleUp } from "react-icons/fa";
import { TMessage } from "../types";
import { useEffect, useState } from "react";

type ChatBoxProps = {
  chat: TMessage[];
  setChat: (messages: TMessage[]) => void;
};

const ChatBox = ({ chat, setChat }: ChatBoxProps) => {
  const disabledSubmitColor = "#676767";
  const [chatBoxRowSize, setChatBoxRowSize] = useState<number | undefined>();

  useEffect(() => {
    const textarea = document.getElementById("msg") as HTMLTextAreaElement;
    textarea.rows = 1;
    setChatBoxRowSize(textarea.scrollHeight);
  }, []);

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    console.log(chatBoxRowSize);
    textarea.rows = 1;
    const numRows = chatBoxRowSize ? textarea.scrollHeight / chatBoxRowSize : 1;
    textarea.rows = numRows < 4 ? numRows : 4;
    // console.log(textarea.scrollHeight, " ", textarea.rows);

    const submitButton = document.getElementById(
      "submit-button"
    ) as HTMLButtonElement;
    textarea.textLength > 0
      ? (submitButton.style.color = "white")
      : (submitButton.style.color = disabledSubmitColor);
  };

  const handleSubmit = () => {
    // TODO: SEVERE ISSUES WHEN EXTENSION MODE
    // e.preventDefault();
    const textarea = document.getElementById("msg") as HTMLTextAreaElement;
    if (textarea.value.length > 0) {
      const msg = textarea.value;
      // console.log(msg);
      setChat([
        ...chat,
        { message: msg, isUser: true },
        { message: msg, isUser: false },
      ]);
      // console.log(chat);
      textarea.value = "";
      textarea.style.height = "auto";
      textarea.rows = 1;
    }
  };

  const overrideEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div className="rounded-3xl pl-3 pr-2 mb-2 mx-5 flex items-end bg-primary justify-between">
        <textarea
          id="msg"
          name="msg"
          placeholder="Message Einstein"
          className="flex-grow my-2 overflow-y-auto no-scrollbar resize-none bg-transparent focus:outline-none text-white"
          onInput={onInput}
          onKeyDown={overrideEnter}
          rows={1}
        />
        {/* TODO: CREATE CUSTOM SCROLLBAR */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-full"
          style={{
            marginBottom: `${
              (16 + (chatBoxRowSize ? chatBoxRowSize : 0)) * 0.15
            }px`,
          }}
        >
          <FaArrowCircleUp
            color={disabledSubmitColor}
            id="submit-button"
            size={(16 + (chatBoxRowSize ? chatBoxRowSize : 0)) * 0.7}
          />
        </button>
      </div>
    </>
  );
};

export default ChatBox;
