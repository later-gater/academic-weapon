import { ReactNode } from "react";

type QAButtonProps = {
  children: ReactNode;
  beginText: string;
  isOpen: boolean;
  typeBoxRef: React.RefObject<HTMLTextAreaElement>;
  handleSubmit: () => void;
};

const QAButton = ({
  children,
  beginText,
  typeBoxRef,
  handleSubmit,
}: QAButtonProps) => {
  const onClick = () => {
    if (typeBoxRef.current) {
      const textarea = typeBoxRef.current as HTMLTextAreaElement;
      if (textarea.value.length > 0) {
        textarea.value = `${beginText}: "${textarea.value}"`;
      } else {
        textarea.value = `${beginText} it`;
      }
      handleSubmit();
    }
  };
  return (
    <button
      onClick={onClick}
      className={`rounded-md py-0.25 w-[4rem] mx-1 text-xs text-white bg-primary`}
    >
      {children}
    </button>
  );
};

export default QAButton;
