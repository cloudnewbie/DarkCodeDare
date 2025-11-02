import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table with Replit Auth fields + app-specific fields
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  curseLevel: integer("curse_level").notNull().default(0),
  fortuneStreak: integer("fortune_streak").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
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
  updatedAt: true,
});

export const insertFortuneSchema = createInsertSchema(fortunes).omit({
  id: true,
  timestamp: true,
});

export type UpsertUser = typeof users.$inferInsert;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFortune = z.infer<typeof insertFortuneSchema>;
export type Fortune = typeof fortunes.$inferSelect;

export interface FortuneResponse {
  cardName: string;
  fortuneText: string;
  cardImage: string;
}
