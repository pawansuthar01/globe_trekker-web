const emailTemplate = ({
  subject = "Globe Trekker Notification",
  userName = "User",
  message = "",
  actionLink = "",
  actionText = "Take Action",
  unsubscribeLink = "#",
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${subject}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
      color: #111827;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      overflow-x: hidden;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 30px 40px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      word-wrap: break-word;
    }

    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    .logo {
      max-height: 60px;
      margin-bottom: 10px;
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
      margin: 10px 0;
    }

    .content {
      font-size: 16px;
      line-height: 1.7;
      margin-top: 30px;
      color: #374151;
    }

    .button {
      display: inline-block;
      margin-top: 30px;
      padding: 12px 24px;
      background-color: #3b82f6;
      color: white !important;
      text-decoration: none;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
    }

    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 13px;
      color: #6b7280;
    }

    .unsubscribe {
      display: inline-block;
      margin-top: 8px;
      color: #6b7280;
      text-decoration: underline;
    }

    /* Responsive for mobile */
    @media screen and (max-width: 600px) {
      .container {
        width: 90% !important;
        padding: 20px !important;
      }

      .button {
        width: 100% !important;
        text-align: center !important;
      }

      .logo {
        max-width: 100px;
      }
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1f2937;
        color: #d1d5db;
      }
      .container {
        background-color: #111827;
        color: #d1d5db;
        box-shadow: 0 8px 24px rgba(255, 255, 255, 0.05);
      }
      .title, .content, .footer {
        color: #e5e7eb;
      }
      .unsubscribe {
        color: #9ca3af;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://globetrekker.site/Logo.jpeg" alt="Globe Trekker Logo" class="logo" />
      <div class="title">${subject}</div>
    </div>

    <div class="content">
      <p>Hi <strong>${userName}</strong>,</p>
      <p>${message}</p>

      ${
        actionLink
          ? `<a href="${actionLink}" class="button" target="_blank">${actionText}</a>`
          : ""
      }

      <p style="margin-top: 30px;">Thanks & regards,<br/>Team Globe Trekker</p>
    </div>

    <div class="footer">
      <p>You’re receiving this email because you signed up on Globe Trekker.</p>
      <a href="${unsubscribeLink}" class="unsubscribe" target="_self">Unsubscribe</a>
    </div>
  </div>
</body>
</html>
`;

export default emailTemplate;
