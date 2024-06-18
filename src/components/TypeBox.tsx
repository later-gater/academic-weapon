import { useEffect } from "react";

type typeBoxProps = {
  handleSubmit: () => void;
  typeBoxRowSize: number | undefined;
  setTypeBoxRowSize: (size: number | undefined) => void;
  disabledSubmitColor: string;
  typeBoxRef: React.RefObject<HTMLTextAreaElement>;
  submitButtonRef: React.RefObject<HTMLButtonElement>;
};

const TypeBox = ({
  handleSubmit,
  typeBoxRowSize,
  setTypeBoxRowSize,
  disabledSubmitColor,
  typeBoxRef,
  submitButtonRef,
}: typeBoxProps) => {
  useEffect(() => {
    if (typeBoxRef.current) {
      typeBoxRef.current.rows = 1;
      setTypeBoxRowSize(typeBoxRef.current.clientHeight);
    }
  }, []);

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    // console.log(typeBoxRowSize);
    textarea.rows = 1;
    const numRows = typeBoxRowSize ? textarea.scrollHeight / typeBoxRowSize : 1;
    textarea.rows = numRows < 4 ? numRows : 4;
    // console.log(textarea.scrollHeight, " ", textarea.rows);

    const submitButton = submitButtonRef.current!.children[0] as HTMLElement;
    textarea.textLength > 0
      ? (submitButton.style.color = "white")
      : (submitButton.style.color = disabledSubmitColor);
  };

  const overrideEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
      onInput(e);
    }
  };

  return (
    <>
      <textarea
        ref={typeBoxRef}
        name="msg"
        placeholder="Message Einstein"
        className="flex-grow my-2 no-scrollbar resize-none bg-transparent focus:outline-none text-white"
        onInput={onInput}
        onKeyDown={overrideEnter}
        rows={1}
      />
      {/* TODO: CREATE CUSTOM SCROLLBAR */}
    </>
  );
};

export default TypeBox;
