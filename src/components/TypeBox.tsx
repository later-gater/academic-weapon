import { useEffect } from "react";

type typeBoxProps = {
  handleSubmit: () => void;
  typeBoxRef: React.RefObject<HTMLTextAreaElement>;
  onTypeBoxInput: (e: HTMLTextAreaElement) => void;
  onChange: () => void;
};

const TypeBox = ({
  handleSubmit,
  typeBoxRef,
  onTypeBoxInput,
  onChange,
}: typeBoxProps) => {
  const overrideEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
      onTypeBoxInput(e.currentTarget as HTMLTextAreaElement);
    }
  };

  useEffect(() => {
    onChange();
  });

  return (
    <>
      <textarea
        ref={typeBoxRef}
        name="msg"
        placeholder="Ask Academic Weapon"
        className="flex-grow my-2 mr-1 h-auto max-h-16 tiny-scrollbar resize-none bg-transparent focus:outline-none text-white"
        onInput={(e) => onTypeBoxInput(e.currentTarget as HTMLTextAreaElement)}
        onChange={() => onChange()}
        onKeyDown={overrideEnter}
        rows={1}
      />
    </>
  );
};

export default TypeBox;
