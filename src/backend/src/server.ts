import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// --- NUEVO ENDPOINT GET (Health Check) ---
// Esto sirve para probar que el servidor vive sin gastar saldo de IA
app.get('/ping', (req, res) => {
    res.json({
        status: 'ok',
        message: 'El servidor está activo y escuchando 🤖',
        timestamp: new Date().toISOString()
    });
});

// --- TU ENDPOINT POST (El Chat) ---
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    // console.log("📩 Pregunta:", message); // Comenta esto si ensucia mucho la terminal

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Eres un orientador vocacional experto en Perú. Ayuda sobre becas y universidades. Sé breve."
                },
                { role: "user", content: message },
            ],
            model: "llama-3.3-70b-versatile",
        });

        const respuesta = chatCompletion.choices[0]?.message?.content || "";
        res.json({ response: respuesta });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Error conectando con la IA" });
    }
});

app.listen(port, () => console.log(`🚀 Server listo en http://localhost:${port}`));