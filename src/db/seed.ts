import { db } from "@/db";
import { newsletterUsersTable } from "@/db/schema";

async function seed() {
  const emails = ["dev@krishnaaa.com", "krishna@entange.com"];

  for (const email of emails) {
    await db.insert(newsletterUsersTable).values({
      email,
      isSubscribed: true,
    });
  }

  console.log("Seeded newsletter_users with test emails:", emails);
}

seed()
  .then(() => {
    console.log("Seeding completed successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
