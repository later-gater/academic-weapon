import { FaArrowCircleUp } from "react-icons/fa";
import { TMessage } from "../types";

type ChatBoxProps = {
  chat: TMessage[];
  setChat: (messages: TMessage[]) => void;
};

const ChatBox = ({ chat, setChat }: ChatBoxProps) => {
  const disabledSubmitColor = "#676767";

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.rows = 1;
    textarea.style.height = "auto";
    // console.log(textarea.scrollHeight);
    const numRows = textarea.scrollHeight / 24;
    textarea.rows = numRows < 4 ? numRows : 4;

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
    const doc = document.getElementById("msg") as HTMLTextAreaElement;
    if (doc.value.length > 0) {
      const msg = doc.value;
      // console.log(msg);
      setChat([
        ...chat,
        { message: msg, isUser: true },
        { message: msg, isUser: false },
      ]);
      // console.log(chat);
      doc.value = "";
      doc.style.height = "auto";
      doc.rows = 1;
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
          className="mb-[7px] rounded-full"
        >
          <FaArrowCircleUp
            color={disabledSubmitColor}
            id="submit-button"
            size={26}
          />
        </button>
        {/* TODO: CENTER THE BUTTON ON START!!! */}
      </div>
    </>
  );
};

export default ChatBox;
