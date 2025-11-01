import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const fortunes = pgTable("fortunes", {
  id: varchar("id").primaryKey(),
  cardName: text("card_name").notNull(),
  fortuneText: text("fortune_text").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertFortuneSchema = createInsertSchema(fortunes).omit({
  id: true,
  timestamp: true,
});

export type InsertFortune = z.infer<typeof insertFortuneSchema>;
export type Fortune = typeof fortunes.$inferSelect;

export interface FortuneResponse {
  cardName: string;
  fortuneText: string;
  cardImage: string;
}
