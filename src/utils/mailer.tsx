const AWS = require('aws-sdk');

export function sendMail(sender, receivers, data) {
    const params = {
        Destination: {
            ToAddresses: receivers
        },
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: 'Website Enquiry'
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmlTemplate(data)
                }
            }
        },
        Source: sender,
    };

    const sendPromise = AWS.SES().sendEmail(params).promise();

    return sendPromise
        .then((data) => data)
        .catch((err) => {
            throw new Error(err);
        });
}

export const post = async (data) => {
    const { url } = data;

    delete data.url;

    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const response = await fetch(url, params);

    if (response.status < 200 && response.status >= 300) {
        const res = await response.json();

        throw new Error(res);
    }

    return response.json();
};