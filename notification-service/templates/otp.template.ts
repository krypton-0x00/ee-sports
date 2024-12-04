export default function otpTemplate(title: string, name: string, otp: number) {
    return ` <!DOCTYPE html>
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
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #ff6600;
            border: 2px solid #ff6600;
            padding: 10px;
            display: inline-block;
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
            <p>Your One-Time Password (OTP) is:</p>
            <div class="otp">${otp}</div>
            <p>Please enter this code to complete your verification. It is valid for a short period of time.</p>
            <p>If you did not request this, please disregard this message.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 EE-Sports. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
`
}
