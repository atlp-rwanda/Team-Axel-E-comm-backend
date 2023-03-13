import { transporter } from "../Auth.service";
import { findOneUserByIdService } from "../User.service";

type EmailParams = {
  id: string;
  name: string;
  sellerId: string;
  quantity: number;
};
export async function sendExpiredProductNotice({
  id,
  name,
  sellerId,
  quantity,
}: EmailParams): Promise<void> {
  const seller = await findOneUserByIdService(sellerId);
  if (!seller) {
    throw new Error("User not found");
  }
  const sellerEmail = seller.email;
  const sellerName = seller.surname;
  const mailOptions = {
    from: '"Team Cypher" <noreply@teamcypher.com>',
    to: sellerEmail,
    subject: "Product Expiry Notice",
    text: `Time to update your stock`,
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
              >${sellerName}</span
            >, 
          </h3>
          <p>Hi</p>
          <p>
            This is to notify you that your product, (<span
              style="font-weight: bold; color: #9da4db"
              >${name}</span
            >) , with id (<span
              style="font-weight: bold; color: #9da4db"
              >${id}</span
            >) has expired.
          </p>Currently there are (<span
              style="font-weight: bold; color: #9da4db"
              >${quantity}</span
            >) units of the product in stock.
         
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
}
