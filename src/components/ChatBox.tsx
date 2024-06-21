import TypeBox from "./TypeBox";
import { FaArrowAltCircleUp, FaStopCircle } from "react-icons/fa";
import { useRef, useEffect } from "react";

type chatBoxProps = {
  loading: boolean;
  initialText: string;
  typeBoxRef: React.RefObject<HTMLTextAreaElement>;
  handleSubmit: () => void;
  submitDisabled: boolean;
  setSubmitDisabled: (disabled: boolean) => void;
  onChange: () => void;
};

const ChatBox = ({
  loading,
  initialText,
  typeBoxRef,
  handleSubmit,
  submitDisabled,
  setSubmitDisabled,
  onChange,
}: chatBoxProps) => {
  const disabledSubmitColor = "#676767";
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const onTypeBoxInput = (textarea: HTMLTextAreaElement) => {


    textarea.value.length > 0
      ? setSubmitDisabled(false)
      : setSubmitDisabled(true);
  };

  useEffect(() => {
    console.log(initialText);
    if (initialText && typeBoxRef.current) {
      (typeBoxRef.current as HTMLTextAreaElement).value = initialText;
      onTypeBoxInput(typeBoxRef.current as HTMLTextAreaElement);
    }
  }, [initialText]);

  useEffect(() => {
    if (submitButtonRef.current) {
      const icon = submitButtonRef.current.children[0] as any;
      if (!loading && submitDisabled) {
        icon.style.color = disabledSubmitColor;
      } else if (!loading && !submitDisabled) {
        icon.style.color = "white";
      } else if (loading) {
        icon.style.color = "white";
      }
    }
  }, [loading, submitDisabled]);

  return (
    <>
      <div className="rounded-3xl pl-3 pr-2 mb-2 mx-5 flex items-end bg-primary">
        <TypeBox
        onChange={onChange}
          handleSubmit={handleSubmit}
          typeBoxRef={typeBoxRef}
          onTypeBoxInput={onTypeBoxInput}
        />
        <button
          type="submit"
          ref={submitButtonRef}
          onClick={handleSubmit}
          className={`rounded-full mb-1 h-6 w-6 ${
            loading && "hover:cursor-default"
          }`}
        >
          {!loading ? <FaArrowAltCircleUp size="1.5rem"/> : <FaStopCircle size="1.5rem"/>}

          {/* TODO: maybe if loading make option to cancel??? */}
        </button>
      </div>
    </>
  );
};

export default ChatBox;
