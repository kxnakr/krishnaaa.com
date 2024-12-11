"use server";

import sgMail from "@sendgrid/mail";
import z from "zod";

const formDataSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
    })
    .min(1, { message: "Email is required" })
    .email("Invalid Email"),
  name: z
    .string({
      invalid_type_error: "Invalid Name",
    })
    .min(1, { message: "Name is required" }),
  message: z
    .string({
      invalid_type_error: "Invalid Message",
    })
    .min(1, { message: "Message is required" }),
});

export const sendEmailToMe = async (formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const validatedFields = formDataSchema.safeParse({
    email,
    name,
    message,
  });
  if (!validatedFields.success) {
    return {
      success: false,
      isValidationError: true,
      errors: validatedFields.error.flatten().fieldErrors.message,
    };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg = {
    from: `Krishna Kumar <apoorva@krishnaaa.com>`,
    to: "krishnakumarlal8421@gmail.com",
    subject: `🚀 New Message from ${name} 🚀`,
    html: `
        <p>Name:         ${name}</p>
        <p>Email:        ${email}</p>
        <p>Message:      ${message}</p>
    `,
  };

  const mailRes = await sgMail.send(msg);

  return {
    success: mailRes[0].statusCode === 202,
    errors: mailRes[0].statusCode === 202 ? null : "Error sending email",
  };
};
