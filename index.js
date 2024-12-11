import bodyParser from "body-parser";
import express from "express";
import { writeFile } from 'node:fs';
import fs from 'node:fs';
import qr from 'qr-image';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/submit", (req, res) => {
    const { inputValues } = req.body;
    writeFile('url.txt', inputValues, (err) => {
        if (err) throw err;
        var qr_png = qr.image(inputValues, { type: 'png' });
        qr_png.pipe(fs.createWriteStream('public/images/url.png'));
        console.log('The file has been saved!');
      });
    res.render("index.ejs", { myUrl: inputValues } )
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})