import TypeBox from "./TypeBox";
import { FaArrowAltCircleUp, FaStopCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

type chatBoxProps = {
  loading: boolean;
  initialText: string;
  typeBoxRef: React.RefObject<HTMLTextAreaElement>;
  handleSubmit: () => void;
  typeBoxRowSize: number | undefined;
  setTypeBoxRowSize: (size: number | undefined) => void;
};

const ChatBox = ({
  loading,
  initialText,
  typeBoxRef,
  handleSubmit,
  typeBoxRowSize,
  setTypeBoxRowSize,
}: chatBoxProps) => {
  const disabledSubmitColor = "#676767";
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);



  const onTypeBoxInput = (textarea: HTMLTextAreaElement) => {
    // console.log(typeBoxRowSize);
    textarea.rows = 1;
    const numRows = typeBoxRowSize ? textarea.scrollHeight / typeBoxRowSize : 1;
    textarea.rows = numRows < 4 ? numRows : 4;
    // console.log(textarea.scrollHeight, " ", textarea.rows);

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
      const icon = submitButtonRef.current.children[0] as HTMLElement;
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
      <div className="rounded-3xl pl-3 pr-2 mb-2 mx-5 flex items-end bg-primary justify-between z-10">
        <TypeBox
          handleSubmit={handleSubmit}
          setTypeBoxRowSize={setTypeBoxRowSize}
          typeBoxRef={typeBoxRef}
          onTypeBoxInput={onTypeBoxInput}
        />
        <button
          type="submit"
          ref={submitButtonRef}
          onClick={handleSubmit}
          className={`rounded-full ${loading && "hover:cursor-default"}`}
          style={{
            marginBottom: `${
              (16 + (typeBoxRowSize ? typeBoxRowSize : 0)) * 0.15
            }px`,
          }}
        >
          {!loading ? (
            <FaArrowAltCircleUp
              size={(16 + (typeBoxRowSize ? typeBoxRowSize : 0)) * 0.7}
            />
          ) : (
            <FaStopCircle
              size={(16 + (typeBoxRowSize ? typeBoxRowSize : 0)) * 0.7}
            />
          )}

          {/* TODO: maybe if loading make option to cancel??? */}
        </button>
      </div>
    </>
  );
};

export default ChatBox;
