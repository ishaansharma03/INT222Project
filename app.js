const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Give your own link in the mongooose.connect("Your URL") in order to connect.
mongoose.connect("mongodb+srv://Portfolio:Ishaan123@dbproject.9myqdkc.mongodb.net/PortfolioDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const User = mongoose.model('User', userSchema);

const path = require('path');
const staticPath = path.join(__dirname);
app.use(express.static(staticPath));
app.use('/sub', express.static(staticPath), (req, res, next) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newUser = new User({ name, email, message });
        await newUser.save();
        res.status(201).send('Saved to the Database');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Failed to register user');
    }
});

const PORT = process.env.PORT || 1001;  
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
