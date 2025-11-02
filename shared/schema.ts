import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  curseLevel: integer("curse_level").notNull().default(0),
  fortuneStreak: integer("fortune_streak").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const fortunes = pgTable("fortunes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  cardName: text("card_name").notNull(),
  fortuneText: text("fortune_text").notNull(),
  cardImage: text("card_image"),
  readingType: varchar("reading_type", { length: 50 }).notNull().default('single-card'),
  isShared: boolean("is_shared").notNull().default(false),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  curseLevel: true,
  fortuneStreak: true,
  createdAt: true,
});

export const insertFortuneSchema = createInsertSchema(fortunes).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFortune = z.infer<typeof insertFortuneSchema>;
export type Fortune = typeof fortunes.$inferSelect;

export interface FortuneResponse {
  cardName: string;
  fortuneText: string;
  cardImage: string;
}
