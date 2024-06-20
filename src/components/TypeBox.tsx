import { useEffect } from "react";

type typeBoxProps = {
  handleSubmit: () => void;
  setTypeBoxRowSize: (size: number | undefined) => void;
  typeBoxRef: React.RefObject<HTMLTextAreaElement>;
  onTypeBoxInput: (e: HTMLTextAreaElement) => void;
};

const TypeBox = ({
  handleSubmit,
  setTypeBoxRowSize,
  typeBoxRef,
  onTypeBoxInput,
}: typeBoxProps) => {
  useEffect(() => {
    if (typeBoxRef.current) {
      typeBoxRef.current.rows = 1;
      setTypeBoxRowSize(typeBoxRef.current.clientHeight);
    }
  }, []);

  const overrideEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
      onTypeBoxInput(e.currentTarget as HTMLTextAreaElement);
    }
  };

  return (
    <>
      <textarea
        ref={typeBoxRef}
        name="msg"
        placeholder="Ask Academic Weapon"
        className="flex-grow my-2 no-scrollbar resize-none bg-transparent focus:outline-none text-white"
        onInput={(e) => onTypeBoxInput(e.currentTarget as HTMLTextAreaElement)}
        onKeyDown={overrideEnter}
        rows={1}
      />
      {/* TODO: CREATE CUSTOM SCROLLBAR */}
    </>
  );
};

export default TypeBox;
