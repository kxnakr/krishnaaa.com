import { boolean, pgTable, timestamp, varchar, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { InferSelectModel } from "drizzle-orm";

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

export const snippetsTable = pgTable("snippets", {
  id: varchar({ length: 36 }).$defaultFn(createId).primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text("description").notNull(),
  code: text("code").notNull(),
  language: varchar({ length: 50 }).notNull(),
  filename: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Snippet = InferSelectModel<typeof snippetsTable>;
