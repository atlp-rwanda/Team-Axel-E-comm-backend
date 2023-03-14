import { transporter } from "../Auth.service";
import { UserAttributes } from "../../interfaces";

type EmailParams = {
  surname: string;
  given_name: string;
  email: string;
};

export const sendExpiredPasswordNotices = async (users: UserAttributes[]) => {
  await Promise.all(
    users.map(async (user) => {
      const { surname, given_name, email } = user;
      await sendExpiredPasswordNotice({ surname, given_name, email });
    }),
  );
};

const sendExpiredPasswordNotice = async ({
  surname,
  given_name,
  email,
}: EmailParams) => {
  const mailOptions = {
    from: '"Team Cypher" <noreply@teamcypher.com>',
    to: email,
    subject: "Password Expiry Notice",
    text: `Time to update your password`,
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
          <h3>
            <i
              class="fa fa-check-circle"
              aria-hidden="true"
              style="color: cyan"
            ></i>
            Dear <span
              style="font-weight: bold; color: #9da4db"
              >${surname} ${given_name}</span
            >, 
          </h3>
          <p>Hi</p>
          <p>
            This is to notify you that your, (<span
              style="font-weight: bold; color: #9da4db"
              >password</span
            >) has expired.
          </p>It's been 90 days since your last update, and you can't access your account without updating your password.
          Please use this (<a href="${process.env.FRONTEND_URL}/updatepassword" target="_blank"
              style="font-weight: bold; color: #9da4db"
              >link</a
            >) to update your password.
         
          <p>
            Please reach out to the team for further inquiry.
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
};
