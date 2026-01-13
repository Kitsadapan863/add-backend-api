const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 เชื่อม MongoDB
mongoose.connect(
    "mongodb+srv://kitsadapankangna685_db_user:j98ctoSFUArbBXyS@cluster0.4l5xm0c.mongodb.net/adddb"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// 🔹 สร้าง Schema
const HistorySchema = new mongoose.Schema({
    a: Number,
    b: Number,
    result: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const History = mongoose.model("History", HistorySchema);

// 🔹 API บวกเลข + บันทึกประวัติ
app.post("/add", async (req, res) => {

    if (mongoose.connection.readyState !== 1) {
        return res.status(500).json({ error: "Database not connected" });
    }

    const { a, b } = req.body;
    const result = Number(a) + Number(b);

    const history = new History({ a, b, result });
    await history.save();

    res.json({ result });
});

// 🔹 API ดึงประวัติ
app.get("/history", async (req, res) => {
    const history = await History.find().sort({ createdAt: -1 });
    res.json(history);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
