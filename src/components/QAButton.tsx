import { ReactNode } from "react";

type QAButtonProps = {
  children: ReactNode;
  beginText: string;
  isOpen: boolean;
  typeBoxRef: React.RefObject<HTMLTextAreaElement>;
};

const QAButton = ({ children, beginText, typeBoxRef }: QAButtonProps) => {
  const onClick = () => {
    if (typeBoxRef.current) {
      const textarea = typeBoxRef.current as HTMLTextAreaElement;
      textarea.value = `${beginText} "${textarea.value}"`;
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
