const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const BLAND_API_KEY = process.env.BLAND_API_KEY;

app.post('/call', async (req, res) => {
  try {
    const { phone_number, pathway_id, candidate_name, candidate_type } = req.body;

    const response = await fetch('https://api.bland.ai/v1/calls', {
      method: 'POST',
      headers: {
        'Authorization': BLAND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number,
        pathway_id,
        voice: 'e9c6bfbf-77fe-4e7d-a077-80bc4b53ef81',
        language: 'pt',
        max_duration: 15,
        record: true,
        metadata: { candidate_name, candidate_type }
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('H2Zero API online ✅'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
