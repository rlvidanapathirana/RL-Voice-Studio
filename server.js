const express = require('express');
const cors = require('cors');
const path = require('path');
const { Communicate } = require('edge-tts-universal');

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// POST /v1/audio/speech (OpenAI compatible endpoint)
app.post('/v1/audio/speech', async (req, res) => {
    try {
        const { input, voice, speed = 1.0 } = req.body;
        
        if (!input || !voice) {
            return res.status(400).json({ error: 'Missing input or voice' });
        }

        console.log(`[Edge TTS] Generating audio for voice: ${voice}`);

        const rateVal = Math.round((speed - 1) * 100);
        const rateStr = rateVal >= 0 ? `+${rateVal}%` : `${rateVal}%`;

        const communicate = new Communicate(input, {
            voice: voice,
            rate: rateStr
        });

        let audioChunks = [];
        for await (const chunk of communicate.stream()) {
            if (chunk.type === 'audio') {
                audioChunks.push(chunk.data);
            }
        }

        const audioBuffer = Buffer.concat(audioChunks);
        
        res.set('Content-Type', 'audio/mpeg');
        res.send(audioBuffer);
        
        console.log(`[Edge TTS] Audio successfully generated and sent (${audioBuffer.length} bytes).`);

    } catch (error) {
        console.error('[Edge TTS Error]', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

// GET /v1/audio/google-free (Proxy for Google Translate TTS)
app.get('/v1/audio/google-free', async (req, res) => {
    try {
        const text = req.query.q;
        if (!text) return res.status(400).json({ error: 'Missing query parameter q' });
        
        console.log(`[Google TTS] Proxying request for: "${text.substring(0, 30)}..."`);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=si&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Google TTS failed with status: ${response.status} ${response.statusText}`);
        }
        
        const buffer = await response.arrayBuffer();
        res.set('Content-Type', 'audio/mpeg');
        res.send(Buffer.from(buffer));
        console.log(`[Google TTS] Audio successfully fetched and sent (${buffer.byteLength} bytes).`);
    } catch (error) {
        console.error('[Google TTS Error]', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(` Edge TTS Node.js Server is running!     `);
    console.log(` Listening on: http://localhost:${PORT}  `);
    console.log(`=========================================`);
});
