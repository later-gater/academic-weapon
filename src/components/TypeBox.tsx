import { useEffect } from "react";

type typeBoxProps = {
  handleSubmit: () => void;
  typeBoxRowSize: number | undefined;
  setTypeBoxRowSize: (size: number | undefined) => void;
  disabledSubmitColor: string;
};

const TypeBox = ({
  handleSubmit,
  typeBoxRowSize,
  setTypeBoxRowSize,
  disabledSubmitColor,
}: typeBoxProps) => {
  
  useEffect(() => {
    const textarea = document.getElementById("msg") as HTMLTextAreaElement;
    textarea.rows = 1;
    setTypeBoxRowSize(textarea.scrollHeight);
  }, []);

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    console.log(typeBoxRowSize);
    textarea.rows = 1;
    const numRows = typeBoxRowSize ? textarea.scrollHeight / typeBoxRowSize : 1;
    textarea.rows = numRows < 4 ? numRows : 4;
    // console.log(textarea.scrollHeight, " ", textarea.rows);

    const submitButton = document.getElementById(
      "submit-button"
    ) as HTMLButtonElement;
    textarea.textLength > 0
      ? (submitButton.style.color = "white")
      : (submitButton.style.color = disabledSubmitColor);
  };

  const overrideEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
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
    </>
  );
};

export default TypeBox;
