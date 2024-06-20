import { useEffect, useRef, useState } from "react";
import QAButton from "./QAButton.tsx";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

type QuickActionProps = {
  typeBoxRef: React.RefObject<HTMLTextAreaElement>;
};

const QuickAction = ({ typeBoxRef }: QuickActionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  let qaButtonsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // if (typeBoxRef.current && qaButtonsRef.current) {
    //   qaButtonsRef.current.style.bottom = `${
    //     typeBoxRef.current.clientHeight + 30
    //   }px`;
    // }
  }, [typeBoxRef.current?.value]);
  return (
    <div
      className={`flex left-4 items-center bg-transparent absolute bottom-2`}
      ref={qaButtonsRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-4 mr-2 rounded-full group bg-primary opacity-100"
      >
        <div className="absolute text-xs -translate-x-6 -translate-y-6 bg-primary rounded-md px-2 text-white transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:block pointer-events-none">
          {isOpen ? "Open" : "Close"} Quick Actions
        </div>
        {!isOpen ? (
          <FaMinusCircle style={{ color: "white" }} />
        ) : (
          <FaPlusCircle style={{ color: "white" }} />
        )}
      </button>
      <div
        className={`relative transition-all duration-500 origin-left ease-out ${
          isOpen ? "translate-y-9" : "translate-y-0"
        }`}
      >
        <QAButton
          isOpen={isOpen}
          beginText="Simplify: "
          typeBoxRef={typeBoxRef}
        >
          Simplify
        </QAButton>
        <QAButton
          isOpen={isOpen}
          beginText="Explain in detail: "
          typeBoxRef={typeBoxRef}
        >
          Explain
        </QAButton>
        <QAButton
          isOpen={isOpen}
          beginText="Summarize: "
          typeBoxRef={typeBoxRef}
        >
          Summary
        </QAButton>
        <QAButton
          isOpen={isOpen}
          beginText="Create an analogy for: "
          typeBoxRef={typeBoxRef}
        >
          Analogy
        </QAButton>
      </div>
    </div>
  );
};

export default QuickAction;
