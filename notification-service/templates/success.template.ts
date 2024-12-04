interface TemplateData {
    title: string,
    name: string,
    msg: string,
    msg2?: string,
    highlight?: string
}
export default function successTemplate({ title, name, msg, msg2, highlight }: TemplateData) {
    return `


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            background-color: #1a1a1a;
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #ffffff;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            background: #333333;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        .header {
            background-color: #ff6600;
            padding: 20px;
            text-align: center;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .success-message {
            font-size: 24px;
            font-weight: bold;
            color: #ff6600;
            margin-top: 10px;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #cccccc;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="your-company-logo-url.png" alt="Company Logo">
            <h1>${title}</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>${msg}</p>
            <div class="success-message">${highlight}</div>
            <p>${msg2}</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
        </div>
        <div class="footer">
            <p>&copy; 2023 Your Company Name. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
`
}
