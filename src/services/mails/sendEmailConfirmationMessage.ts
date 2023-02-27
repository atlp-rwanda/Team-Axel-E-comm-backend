import { transporter } from '../Auth.service';

const sendEmailConfirmationMessage = async (
  email: string,
  name: string
): Promise<void> => {
  const mailOptions = {
    from: '"Team Cypher" <noreply@teamcypher.com>',
    to: email,
    subject: 'Welcome to Team Cypher',
    text: `Hi, ${name},\n\nWelcome to Team Cypher!\n\n`,
    html: `
      <html>
  <head>
    <style>
      
    body {
      color: white;
      background: #020917;
  }
  .container {
    font-family: 'Helvetica Neue', Helvetica;
    text-align: left;
    padding: 5px; 
    background: #020917;
    border: 1px solid cyan;
    border-radius: 8px;
  }
  .text-container{
    width: 90%;
    max-width: 800px;
    font-weight: 300;
    margin: 0 auto;
    padding: 15px;
    padding-bottom: 15px;
  }
  h1{
    font-weight: 100;
  }
      a{
        text-decoration: none;
        color: none;
      }
  .button {
    padding: 15px;
    font-family: 'Helvetica Neue', Helvetica;
    text-size: 18px;
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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    </head>
    <body>
      <div class="container" id="mobile">
        <div class= "text-container">
        <h1><i class="fa fa-check-circle" aria-hidden="true" style="color: cyan;"></i> Email Confirmation Response</h1>
           <p>Hi, ${name}</p>
      <p>This is to confirm your registration with our app.</p>
      <p>You can log into your account via the link below.</p>
          <a href="${process.env.CLIENT_URL}:${process.env.PORT}/api/v1/auth/login/" target="_blank" class= "button">Log In</a>
          <p>Cheers,</p><p>Team Cypher</p>
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
export default sendEmailConfirmationMessage;
