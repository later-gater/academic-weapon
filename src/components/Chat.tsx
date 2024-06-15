import { TMessage } from "../types";

const Chat = ({chat} : {chat: TMessage[]}) => {
  return (
    <div className="w-full flex h-full flex-col px-5 py-2 overflow-y-scroll text-white">
        {/* TODO: MAKE PRETTY SCROLLBAR */}
      {chat.map((msg, index) => {
        return (
          <div
            key={index}
            className={`${
              msg.isUser
                ? "bg-primary self-end max-w-[75%]"
                : "self-start max-w-[90%]"
            } px-3 py-1 rounded-3xl m-1  break-words`}
          >
            {msg.message}
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
