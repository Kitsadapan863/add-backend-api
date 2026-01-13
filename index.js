const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// API สำหรับบวกเลข
app.post("/add", (req, res) => {
    const { a, b } = req.body;

    const result = Number(a) + Number(b);

    res.json({
        result: result
    });
});


app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});