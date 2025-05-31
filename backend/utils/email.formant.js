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
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
      color: #1f2937;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    }
    .header {
      text-align: center;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 20px;
    }
  .nav {
  display: flex;
  gap: 10px; 
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  background: white; 
}

.nav a {
  color: red;
  text-decoration: none;
  padding: 2px 6px;
}
    .header img {
      max-height: 60px;
      margin-bottom: 10px;
    }
    .header h2 {
      font-size: 22px;
      color: #111827;
      margin: 0;
    }
    .content {
      margin-top: 30px;
      font-size: 16px;
      line-height: 1.7;
      color: #374151;
    }
    .button {
      display: inline-block;
      margin-top: 25px;
      padding: 10px 20px;
      background-color: #2563eb;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 15px;
    }
    .footer {
      margin-top: 50px;
      font-size: 13px;
      color: #6b7280;
      text-align: center;
    }
    .unsubscribe {
      margin-top: 10px;
      color: #6b7280;
      text-decoration: underline;
      display: inline-block;
    }

    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1f2937;
        color: #d1d5db;
      }
      .container {
        background-color: #111827;
        box-shadow: 0 10px 25px rgba(255, 255, 255, 0.05);
      }
         
      .header h2 {
        color: #ffffff;
      }
      .content {
        color: #d1d5db;
      }
      .footer {
        color: #9ca3af;
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
      <img src="https://globetrekker.site/Logo.png" alt="Globe Trekker Logo" />
      <div class="nav">
       <h2>${subject}</h2>
       <a href="${unsubscribeLink}" class="unsubscribe" target="_self">Unsubscribe</a>
      </div>
     
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
