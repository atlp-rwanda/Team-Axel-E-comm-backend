import { transporter } from "../Auth.service";

export default async function sendEmailToken(
  email: string,
  code: string,
): Promise<void> {
  console.log(Math.random(), "muslim");

  const mailOptions = {
    from: '"Team Cypher" <noreply@teamcypher.com>',
    to: email,
    subject: "verification code",
    text: `Hi \n\n you login verification code is ${code}!\n\n`,
    html: `
        
          <p>use the following code to log in you account <strong>${code}</strong></p>
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
