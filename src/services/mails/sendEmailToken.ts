import { transporter } from "../Auth.service";

export default async function sendEmailToken(
  email: string,
  code: string,
): Promise<void> {
  const mailOptions = {
    from: '"Team Cypher" <noreply@teamcypher.com>',
    to: email,
    subject: "verification code",
    text: `Hi \n\n one time password verification code ${code}!\n\n`,
    html: `
    <html>
    <head>
      <style>
       
        .container {
          font-family: "Helvetica Neue", Helvetica;
          text-align: left;
          padding: 5px;
          border: 1px solid cyan;
          border-radius: 8px;
        }
        .text-container {
          width: 90%;
          max-width: 800px;
          font-weight: 300;
          margin: 0 auto;
          padding: 15px;
          padding-bottom: 15px;
        }
        h1 {
          font-weight: 100;
        }
        a {
          text-decoration: none;
        }
        .button {
          padding: 15px;
          font-family: "Helvetica Neue", Helvetica;
          font-size: 18px;
          color: black;
          background-color: cyan;
          border: 0;
          border-radius: 8px;
          margin: 10px;
          display: block;
          max-width: 200px;
          margin: auto;
          text-decoration: none;
          text-align: center;
        }
        p {
          line-height: 1.5;
        }
      </style>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
      />
    </head>
    <body>
      <div class="container" id="mobile">
        <div class="text-container">
          <h1>
            <i
              class="fa fa-check-circle"
              aria-hidden="true"
              style="color: cyan"
            ></i>
            Please use the following code to verify yourself
          </h1>
          <p>Hi</p>
          <p>
            Use this code to verify your self for further operation on your account (<span
              style="font-weight: bold; color: #9da4db"
              >@${email}</span
            >).
          </p>
          <span class="button" onclick="">${code}</span>
          <p>
  
              <small>
                  this is for security purpose, if your didn't requested this code you must be hacked try change your password.
              </small>
          </p>
          <p>Best regards,</p>
          <p>Team Cypher</p>
        </div>
      </div>
    </body>
  </html>
  
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (error instanceof Error) {
      console.error(` 🚗 Error sending mail: ${error.message}`);
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
}
