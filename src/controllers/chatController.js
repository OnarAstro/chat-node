import genAI from "../config/geminiConfig.js";



export const chatWithGemini = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "يجب إرسال رسالة" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const responseText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "لم يتم العثور على رد.";

    res.json({ reply: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "حدث خطأ في السيرفر" });
  }
};
