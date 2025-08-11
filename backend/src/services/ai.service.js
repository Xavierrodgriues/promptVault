require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateTags(
  promptText = "how to become multimillionaire in 2025 with creating personal brand and very less hard work"
) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate a concise list of 5 most relevant tags for the following topic.
Return ONLY a valid JSON array of strings with no explanation.
Topic: "${promptText}"`,
  });

  try {
    // Get the text output from Gemini
    let output = response.text;

    // Remove markdown code fences if present
    output = output.replace(/```json|```/g, "").trim();

    // Parse cleaned JSON
    const tags = JSON.parse(output);

    console.log("Generated tags:", tags);
    return tags;
  } catch (err) {
    console.error("Failed to parse tags:", err, "\nRaw output:", response.text);
    return [];
  }
}

module.exports = generateTags;