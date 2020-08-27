const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3030;

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(cors());

app.post('/upload', upload.any(), function (req, res, next) {
    console.log(req.files || req.file);
    if (req.files || req.file) {
        return res.status(200).json(req.files || req.file);
    }
    return res.status(400).json({ msg: 'PLEASE UPLOAD FILE' });
});

app.get('/', (req, res, next) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(
    port,
    () => {
        console.log('Listening on http://localhost:' + port)
    }
);