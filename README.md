# Academic Weapon
Academic Weapon is a Chrome extension designed to facilitate your online learning experience. Using state-of-the-art LLMs, Academic Weapon provides instant, contextual assistance as you browse articles and educational content.

🚀 Key Features

- 📌 Smart Side Panel: Access an LLM-powered assistant without leaving your current page
- 🧠 Contextual Intelligence: The LLM pre-loads with your article's context for highly relevant answers
- 🖱️ Easy Text Transfer: Highlight, right-click, and instantly send text to the side panel for clarification
- ⚡ Quick Questions: Use pre-set prompts like "Summarize," "Simplify," and "Create an Analogy" for rapid insights

🔧 How It Works

1. Navigate to a challenging article
2. Highlight text you find confusing
3. Right-click to open the side panel
4. Ask the LLM your question
5. Receive a tailored, context-aware explanation

💡 Use Cases

- Students: Clarify complex concepts in research papers or textbooks
- Researchers: Gain quick insights and alternative explanations for dense academic content
- Lifelong Learners: Enhance comprehension of any online educational material

🛠️ Installation
1. Clone the repo

        git clone https://github.com/later-gater/academic-weapon
        cd academic-weapon

3. Create a .env file with your Gemini API Key (get your API Key using this [tutorial](https://www.youtube.com/watch?v=OVnnVnLZPEo))

        echo "VITE_GEMINI_API_KEY=[YOUR_GEMINI_KEY]" > .env

4. Build the extension (requires node.js)

        npm run build

6. Navigate to chrome://extensions/
7. Enable Developer mode
8. Click "Load Unpacked"
9. Upload the "dist" folder