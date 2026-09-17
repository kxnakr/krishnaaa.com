"use server";

import sgMail from "@sendgrid/mail";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { newsletterUsersTable, snippetsTable } from "@/db/schema";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email())
  .pipe(z.string().max(254));

export async function addToNewsletter(formData: FormData) {
  const result = emailSchema.safeParse(formData.get("email"));
  if (!result.success) return { error: "Enter a valid email address." };
  try {
    const inserted = await getDb()
      .insert(newsletterUsersTable)
      .values({ email: result.data })
      .onConflictDoNothing({ target: newsletterUsersTable.email })
      .returning({ id: newsletterUsersTable.id });
    return inserted.length
      ? { success: "You’re on the list." }
      : { error: "You’ve already subscribed." };
  } catch {
    return { error: "I couldn’t save your email. Please try again later." };
  }
}

const contactSchema = z.object({
  email: emailSchema,
  name: z.string().trim().min(1, "Enter your name.").max(100),
  message: z.string().trim().min(1, "Write a message.").max(5000),
});

export async function sendEmailToMe(formData: FormData) {
  if (formData.get("website"))
    return { error: "Please email dev@krishnaaa.com instead." };
  const result = contactSchema.safeParse(Object.fromEntries(formData));
  if (!result.success)
    return { error: result.error.issues[0]?.message ?? "Check your message." };
  const key = process.env.SENDGRID_API_KEY;
  if (!key) return { error: "Please email dev@krishnaaa.com instead." };
  try {
    sgMail.setApiKey(key);
    await sgMail.send({
      from: "Krishna Kumar <portfolio@krishnaaa.com>",
      to: "krishnakumarlal8421@gmail.com",
      replyTo: result.data.email,
      subject: `Website message from ${result.data.name}`,
      text: `Name: ${result.data.name}\nEmail: ${result.data.email}\n\n${result.data.message}`,
    });
    return { success: "Thanks for writing." };
  } catch {
    return {
      error: "I couldn’t send your message. Please email dev@krishnaaa.com.",
    };
  }
}

export async function getSnippets() {
  try {
    return await getDb()
      .select()
      .from(snippetsTable)
      .orderBy(desc(snippetsTable.createdAt));
  } catch {
    return null;
  }
}

export async function getSnippetBySlug(slug: string) {
  const [snippet] = await getDb()
    .select()
    .from(snippetsTable)
    .where(eq(snippetsTable.slug, slug));
  return snippet ?? null;
}
