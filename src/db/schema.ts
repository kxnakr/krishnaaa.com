import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const newsletterUsersTable = pgTable("newsletter_users", {
  id: varchar({ length: 36 }).$defaultFn(createId).primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  isSubscribed: boolean("is_subscribed").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
