import { GoogleGenerativeAI } from "@google/generative-ai";

const Gemini = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const genPrompt = async (prompt: string) => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text;
    console.log(text);
  };
  return (
    <button onClick={() => genPrompt("What color is the sky?")}>PROMPT</button>
  );
};

export default Gemini;
