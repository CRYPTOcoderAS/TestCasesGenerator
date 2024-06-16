const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');   
const axios = require('axios');

dotenv.config(); 

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const apiKey = process.env.API_KEY;

async function getChatGptResponse(language, code) {
    try {
        const prompt = `Generate test cases for the following code snippet:\n\n${code} in ${language}. Only give the code for the test cases.`;

        const messages = [
            { role: 'system', content: 'You are a system.' },
            { role: 'user', content: prompt}  
        ];

        console.log('Request to ChatGPT:', { model: 'gpt-3.5-turbo', messages });

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages,
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Response from ChatGPT:', response.data);

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            const message = response.data.choices[0].message;
            if (message && message.content) {
                return message.content.trim(); 
            } else {
                throw new Error('Unexpected response from ChatGPT: No message content');
            }
        } else {
            throw new Error('Unexpected response from ChatGPT: No choices or empty choices array');
        }
    } catch (error) {
        console.error('Error in ChatGPT request:', error);
        return 'Error in fetching response from ChatGPT.';
    }
}

app.post('/generate_tests', async (req, res) => {
    const { language, code } = req.body;

    const chatgptResponse = await getChatGptResponse(language, code);

    res.json({ chatgptResponse });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
