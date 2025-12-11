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

// Health Check
app.get('/ping', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor Orientador Activo 🧠🇵🇪' });
});

app.post('/api/chat', async (req, res) => {
    const { history } = req.body;

    if (!history || !Array.isArray(history)) {
        return res.status(400).json({ error: "El historial es requerido" });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Eres un orientador vocacional experto en Perú 🇵🇪. Tu misión es ayudar a estudiantes de secundaria y egresados a encontrar su camino profesional.

                    REGLAS DE TUS RESPUESTAS:
                    1. **Formato:** Usa SIEMPRE Markdown para estructurar tu respuesta. Usa **negritas** para conceptos clave y listas (- o 1.) para requisitos o pasos.
                    2. **Expertise:** Eres especialista en Beca 18, PRONABEC, exámenes de admisión (UNI, San Marcos, Villarreal, PUCP, UTP) y carreras técnicas (Senati, Tecsup).
                    3. **Tono:** Sé empático, motivador ("¡Tú puedes!", "Es un gran objetivo") pero realista y claro.
                    4. **Memoria:** Si el usuario te ha dicho su nombre en mensajes anteriores, ÚSALO para personalizar la respuesta.
                    5. **Claridad:** Si te preguntan requisitos, dalos en una lista clara. No uses párrafos gigantes.

                    Si te preguntan algo fuera de educación, responde amablemente que solo puedes asesorar sobre temas educativos.`
                },
                ...history
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7, // Un poco de creatividad, pero enfocado
        });

        const respuesta = chatCompletion.choices[0]?.message?.content || "";
        res.json({ response: respuesta });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Error conectando con la IA" });
    }
});

app.listen(port, () => console.log(`🚀 Server listo en http://localhost:${port}`));