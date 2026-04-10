const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(".")); // serve frontend files (index.html, style.css, script.js)

// In-memory store for reviews (resets when server restarts)
let reviews = {};

// GET reviews for a dish
app.get("/reviews/:dish", (req, res) => {
    const dish = req.params.dish;
    res.json(reviews[dish] || []);
});

// POST a new review for a dish
app.post("/reviews/:dish", (req, res) => {
    const dish = req.params.dish;
    const { rating, text } = req.body;

    // Validate rating: must be a number between 0 and 5 (decimals allowed)
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 0 and 5" });
    }

    if (!reviews[dish]) reviews[dish] = [];

    reviews[dish].push({ rating, text });

    console.log(`Review added for [${dish}]:`, { rating, text });

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
