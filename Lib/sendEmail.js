import { Resend } from "resend";
import CodeEmail from "../react-email-starter/emails/email";
import { renderToStaticMarkup } from "react-dom/server"; // Import renderToStaticMarkup


const resend = new Resend('re_4yyJobCa_JtcwVtcacofPzgtti5b5FZn8');

export const sendEmail = async () => {
  try {
    const emailHtml = renderToStaticMarkup(<CodeEmail name="Eric" />); // Convert JSX to HTML string

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["emekaeric12@gmail.com"],
      subject: "Hello World",
      html: emailHtml,
    });
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error(error);
  }
};
