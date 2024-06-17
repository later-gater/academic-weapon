import TypeBox from "./TypeBox";
import { FaArrowCircleUp } from "react-icons/fa";
import { useState } from "react";
import { TMessage } from "../types";

type chatBoxProps = {
  chatHistory: TMessage[];
  setChatHistory: (chatHistory: TMessage[]) => void;
};

const ChatBox = ({ chatHistory, setChatHistory }: chatBoxProps) => {
  const disabledSubmitColor = "#676767";
  const [typeBoxRowSize, setTypeBoxRowSize] = useState<number | undefined>();

  const handleSubmit = () => {
    const textarea = document.getElementById("msg") as HTMLTextAreaElement;
    if (textarea.value.length > 0) {
      const msg = textarea.value;
      // console.log(msg);
      setChatHistory([...chatHistory, { parts: [{ text: msg }], role: "user"}]);
      // console.log(chat);
      textarea.value = "";
      textarea.style.height = "auto";
      textarea.rows = 1;
    }
  };
  return (
    <div className="rounded-3xl pl-3 pr-2 mb-2 mx-5 flex items-end bg-primary justify-between">
      <TypeBox
        handleSubmit={handleSubmit}
        typeBoxRowSize={typeBoxRowSize}
        setTypeBoxRowSize={setTypeBoxRowSize}
        disabledSubmitColor={disabledSubmitColor}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="rounded-full"
        style={{
          marginBottom: `${
            (16 + (typeBoxRowSize ? typeBoxRowSize : 0)) * 0.15
          }px`,
        }}
      >
        <FaArrowCircleUp
          color={disabledSubmitColor}
          id="submit-button"
          size={(16 + (typeBoxRowSize ? typeBoxRowSize : 0)) * 0.7}
        />
      </button>
    </div>
  );
};

export default ChatBox;
