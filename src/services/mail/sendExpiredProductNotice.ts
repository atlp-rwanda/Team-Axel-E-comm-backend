// TODO: Take the seller ID from the product and use it to get the seller's email
// TODO: Send the email to the seller using a template
// TODO: include the product name and the product ID in the email
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { transporter } from "../../utils";
import { findOneUserService } from "../User.service";

interface IParams {
  id: string;
  name: string;
  sellerId: string;
  quantity: number;
}

const hbs = Handlebars.create();

// Read the email template file
const emailTemplatePath = path.join(
  __dirname,
  "../../../views/email.handlebars",
);
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

// Compile the email template
const template = hbs.compile(emailTemplate);

// send an email asking to confirm their registration.
export const sendExpiredProductNotice = async (product: IParams) => {
  const { id, name, sellerId, quantity } = product;
  try {
    // Get the seller's email
    const seller = await findOneUserService(sellerId);
    if (!seller) throw new Error("Seller not found");
    const email = seller?.email;
    // Get the seller's name
    const sellerName = seller?.surname;

    // Create the email body
    const emailBody = template({
      sellerName,
      id,
      name,
      quantity,
    });
    // Create the email options
    const mailOptions = {
      to: email,
      subject: "Your product has expired",
      html: emailBody,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (error instanceof Error) {
      console.error(` 🚗 Error sending mail: ${error.message}`);
    } else {
      console.log(`Something went wrong: `, error);
    }
  }
};
