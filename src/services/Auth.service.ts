import nodemailer from 'nodemailer';
import User from '../database/models/User.model';
import { Status } from '../interfaces';

// Find one User
export const findOneUserByEmailService = async (email: string) => {
  const findOneUserRequest = await User.findOne({ where: { email } });
  return findOneUserRequest;
};

// find the user who has clicked the link.
export const findRegisteredUserService = async (confirmationCode: string) => {
  const currentUser = await User.findOne({ where: { confirmationCode } });
  return currentUser;
};

// confirm the user who clicked and update status
export const confirmUserService = async (confirmationCode: string) => {
  const confirmedUser = await User.update(
    { status: Status.Active },
    { where: { confirmationCode } }
  );
  return confirmedUser;
};
/*
 * Nodemailer to handle sending the email.
 */
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST as string,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

// send an email asking to confirm their registration.
export const sendEmailConfirmationRequest = async (
  email: string,
  name: string,
  confirmationCode: string
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
      <h1><i class="fa fa-check-circle" aria-hidden="true" style="color: cyan;"></i> Please confirm your email address</h1>
         <p>Hi, ${name}</p>
    <p>Tap the button below to confirm your email address (<span style="font-weight: bold; color: #9DA4DB;">@${email}</span>).</p>
    <p>If you didn't create an account with Team Cypher, you can safely delete this email. </p>
        <a href="${process.env.CLIENT_URL}/api/v1/auth/confirm/${confirmationCode}" target="_blank" class= "button">Confirm</a>
         <p>Best regards,</p><p>Team Cypher</p>
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

// send mail that they have confirmed.
export const sendEmailConfirmationMessage = async (
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
        <a href="${process.env.CLIENT_URL}/api/v1/auth/login/" target="_blank" class= "button">Log In</a>
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

//Send email for password reset request

export const sendResetRequestEmail = async (
  email: string,
  name: string,
  token: string
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
    <p>You requested to reset your password.</p>
    <p>Please, click the link below to reset your password</p>
        <a href="${process.env.CLIENT_URL}/api/v1/auth/resetPassword/${token}" target="_blank" class= "button">Reset Password</a>
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

// Send email confirmation after password reset
export const sendPasswordResetConfirmation = async (
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
    <p>Password reset successfully</p>
    <p>You can log into your account via the link below.</p>
        <a href="${process.env.CLIENT_URL}/api/v1/auth/login/" target="_blank" class= "button">Log In</a>
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
