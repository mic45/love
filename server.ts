import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === 'production';
  // In development, dev server must run on port 3000 behind the container reverse proxy.
  const port = isProd && process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API endpoint: Generate AI Love Letter or Vows using Gemini
  app.post('/api/generate-love-letter', async (req, res) => {
    try {
      const {
        senderName = '',
        recipientName = '',
        tone = 'Romantique & Émouvant',
        formatType = "Lettre d'amour",
        relationshipDuration = 'Ensemble depuis quelques années',
        specialMemories = '',
        keyQualities = '',
        language = 'fr',
      } = req.body;

      if (!recipientName) {
        return res.status(400).json({ error: 'recipientName is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is not configured on the server.',
          useFallback: true,
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const isEnglish = language === 'en';

      const systemPrompt = isEnglish
        ? `You are an acclaimed romantic writer and sensitive poet known for authentic, moving love letters and personal vows.
Your task is to write a deeply heartfelt, beautiful, and personalized piece for a couple.

Details:
- Recipient: ${recipientName}
- Sender: ${senderName || 'My Love'}
- Desired format: ${formatType}
- Tone: ${tone}
- Relationship duration: ${relationshipDuration}
${specialMemories ? `- Personal memories / charming anecdotes: ${specialMemories}` : ''}
${keyQualities ? `- Things the sender admires most: ${keyQualities}` : ''}

Writing instructions:
1. Write the letter or vows directly, addressing ${recipientName} warmly.
2. Avoid generic robotic clichés. Use tactile, tender, and emotionally resonant language.
3. Weave in the specific memories and qualities provided in a natural, elegant manner.
4. Conclude with an affectionate closing and sign with "${senderName || 'With all my love'}".
5. Do NOT include any meta-talk or introductory remarks (do not say "Here is your letter:"). Output only the formatted letter with clear paragraphs.`
        : `Tu es un auteur et poète amoureux sensible, sincère et éloquent.
Ta mission est de rédiger un texte amoureux personnalisé, profondément touchant et élégant pour un couple.

Détails :
- Destinataire : ${recipientName}
- Expéditeur : ${senderName || 'Mon amour'}
- Format demandé : ${formatType}
- Tonalité : ${tone}
- Durée de la relation : ${relationshipDuration}
${specialMemories ? `- Souvenirs et anecdotes intimes partagées : ${specialMemories}` : ''}
${keyQualities ? `- Ce que l'expéditeur admire profondément chez l'autre : ${keyQualities}` : ''}

Consignes de style :
1. Écris directement le texte ou la lettre, en commençant par une formule d'adresse tendre pour ${recipientName}.
2. Évite les clichés mièvres ou impersonnels. Privilégie une émotion sincère, la vérité du cœur et la bienveillance.
3. Intègre subtilement et élégamment les souvenirs et qualités mentionnés.
4. Conclus par une belle déclaration et signe au nom de ${senderName || 'Avec tout mon amour'}.
5. Ne mets aucun texte méta ou de préambule (ne dis pas "Voici votre lettre :"). Fournis uniquement le texte magnifiquement mis en page avec des paragraphes aérés.`;

      let letterText = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: systemPrompt,
        });
        letterText = response.text || '';
      } catch (primaryErr: any) {
        console.warn('Primary model gemini-3.1-flash-lite failed, trying gemini-3.8-flash:', primaryErr?.message);
        const retryResp = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: systemPrompt,
        });
        letterText = retryResp.text || '';
      }

      return res.json({ text: letterText });
    } catch (err: any) {
      console.error('Error generating love letter with Gemini:', err);
      return res.status(500).json({
        error: err.message || 'Une erreur est survenue lors de la génération.',
        useFallback: true,
      });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      logLevel: 'silent',
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
