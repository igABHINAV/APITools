const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './build')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.post('/send', async (req, res) => {
    const { method, url, headers, body, token } = req.body;

    try {
        const config = {
            method,
            url,
            headers: {
                ...headers,
                Authorization: `Bearer ${token}` // Add Bearer token to the request headers
            },
            data: body
        };

        const response = await axios(config);

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});



const port = process.env.PORT || 8000; // or any other port number you prefer
app.listen(port);
