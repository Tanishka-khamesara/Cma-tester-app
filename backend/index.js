const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


const uri = "mongodb+srv://tanishkajain24941:lp0Sl9ykFNWdkRgT@cluster0.a71tq.mongodb.net/Cmatest";

// Mongoose schema for user progress
const progressSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    progress: { type: Object }, 
});

const Progress = mongoose.model('Progress', progressSchema); 

async function connectToDatabase() {
    try {
        await mongoose.connect(uri); 
        console.log("Connected to MongoDB using Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase().then(() => {
    app.post('/api/progress', async (req, res) => {
        try {
            const userId = req.body.userId;
            const progress = req.body.progress;

           
            const updatedProgress = await Progress.findOneAndUpdate(
                { userId },
                { progress },
                { new: true, upsert: true }
            );

            res.json({ message: 'Progress saved successfully', updatedProgress });
        } catch (error) {
            console.error("Error saving progress:", error);
            res.status(500).json({ message: 'Failed to save progress', error: error.message }); // Send error message
        }
    });

    app.get('/api/progress/:userId', async (req, res) => {
        try {
            const userId = req.params.userId;
            const progressDoc = await Progress.findOne({ userId });
            const progress = progressDoc ? progressDoc.progress : null;
            res.json({ progress });
        } catch (error) {
            console.error("Error getting progress:", error);
            res.status(500).json({ message: 'Failed to get progress', error: error.message }); 
        }
    });

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});