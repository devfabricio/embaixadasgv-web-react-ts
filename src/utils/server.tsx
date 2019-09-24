const AWS = require('aws-sdk'); // Load the SDK for JavaScript
const mailer = require("./mailer");
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

AWS.config.update({region: 'eu-west-1'}); // Set the region that you configured in AWS

app.set('/api/contact', (req, res, next) => {
    return mailer.sendMail('sender@email.com', ['reciever@email.com'], req.body)
        .then(() => res.send(req.body))
        .catch(next);
});

app.listen(port, () => console.log(`Listening on port ${port}`));