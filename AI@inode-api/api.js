const express = require('express');
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

app.post('AI/generate-comments', async (req, res) => {
    const { tweetMessage, emotion, language } = req.body;

    if (!tweetMessage || !emotion || !language) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const llm = new ChatOpenAI();
        const tweetPrompt = PromptTemplate.fromTemplate(process.env.TWEET_MODEL_PRESET);
        const formattedPromptTemplate = await tweetPrompt.format({ emotion, tweetMessage, language });
        const x = PromptTemplate.fromTemplate(formattedPromptTemplate);
        const tweetChain = x.pipe(llm);
        const response = await tweetChain.invoke({ tweetMessage });

        const commentsArray = response.content
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => line.replace(/^\d+\.\s*/, ''))
            .map(comment => comment.replace(/"/g, ''));

        res.json({ comments: commentsArray });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/test/:id',(req,res) => {
    const { id } = req.params;
    res.send('testing '+id);
})


app.get('/', (req,res) => res.send('twitAI@inode API Running'))
app.listen(port, () => {
    console.log(`API server is running at http://localhost:${port}`);
});
