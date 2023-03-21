const express = require('express');
const http = require('http');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



function sendEmailInvitation(recipient) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'empty.anec@gmail.com',
        pass: 'texlbtfnnumcsyvn',
      },
    });

    const mailOptions = {
      from: 'Empty <empty.anec@gmail.com>',
      to: recipient,
      subject: 'My first Email!!!',
      text: 'This is my first email. I am so excited!',
      html: `<a href="http://localhost:3000" target="_blank">Link</a>`,
    };

    transporter.sendMail(mailOptions, (err) => {
      err ? rej(false) : res(true);
    });
  });
}