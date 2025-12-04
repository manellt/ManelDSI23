const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/analyze-stress', async (req, res) => {
  const { mood, sleep, activity } = req.body;
  const prompt = `Analyze stress level based on mood: ${mood}, sleep: ${sleep}, activity: ${activity}. Return level (1-10) and advice.`;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 100
    }, {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
    });

    const result = response.data.choices[0].text.trim();
    res.json({ level: parseInt(result.split(' ')[0]), advice: result });
  } catch (error) {
    res.status(500).json({ error: 'AI analysis failed' });
  }
});

module.exports = router;