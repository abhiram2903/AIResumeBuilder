const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateExperience = async (req, res) => {
    try {
        const { role, company, description } = req.body;

        if (!role) {
            return res.status(400).json({ error: "Job role is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

        const prompt = `
            Act as an expert resume writer. I am providing a job role, company, and rough description. 
            Generate 3-4 professional, impactful, and ATS-friendly resume bullet points.
            Start each bullet with a strong action verb. Include metrics where plausible.
            
            Role: ${role}
            Company: ${company || 'N/A'}
            Rough Description: ${description || 'N/A'}

            Return the response STRICTLY as a JSON array of strings. Do not include markdown formatting like \`\`\`json.
            Example: ["Bullet 1", "Bullet 2", "Bullet 3"]`;

        const result = await model.generateContent(prompt);
        
        // Use 'let' here so the variable can be reassigned:
        let rawText = await result.response.text();

        // Strip out accidental markdown fences if Gemini adds them
        const cleanedText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();

        const bullets = JSON.parse(cleanedText);
        console.log("🎯 AI GENERATED DATA:", bullets);
        res.status(200).json({ bullets });
    }
    catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to generate AI content." });
    }
}
module.exports = { generateExperience };