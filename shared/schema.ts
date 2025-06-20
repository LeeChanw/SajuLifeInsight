import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sajuReadings = pgTable("saju_readings", {
  id: serial("id").primaryKey(),
  birthYear: integer("birth_year").notNull(),
  birthMonth: integer("birth_month").notNull(),
  birthDay: integer("birth_day").notNull(),
  birthHour: integer("birth_hour").notNull(),
  birthMinute: integer("birth_minute").notNull(),
  calendarType: text("calendar_type").notNull(), // 'solar' or 'lunar'
  gender: text("gender").notNull(), // 'male' or 'female'
  fourPillars: jsonb("four_pillars").notNull(),
  analysis: jsonb("analysis").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSajuReadingSchema = createInsertSchema(sajuReadings).omit({
  id: true,
  createdAt: true,
});

export type InsertSajuReading = z.infer<typeof insertSajuReadingSchema>;
export type SajuReading = typeof sajuReadings.$inferSelect;

export const sajuInputSchema = z.object({
  birthYear: z.number().min(1900).max(2024),
  birthMonth: z.number().min(1).max(12),
  birthDay: z.number().min(1).max(31),
  birthHour: z.number().min(0).max(23),
  birthMinute: z.number().min(0).max(59),
  calendarType: z.enum(['solar', 'lunar']),
  gender: z.enum(['male', 'female']),
});

export type SajuInput = z.infer<typeof sajuInputSchema>;

export interface FourPillars {
  year: { heavenly: string; earthly: string; korean: string; };
  month: { heavenly: string; earthly: string; korean: string; };
  day: { heavenly: string; earthly: string; korean: string; };
  time: { heavenly: string; earthly: string; korean: string; };
}

export interface SajuAnalysis {
  personality: {
    main: string;
    traits: string;
  };
  career: {
    suitableFields: string[];
    prospects: string;
  };
  wealth: {
    characteristics: string;
    cautions: string;
    favorablePeriod: string;
  };
  health: {
    careAreas: string[];
    management: string;
  };
  love: {
    characteristics: string;
    idealPartner: string;
    marriageAge: string;
  };
  lifeFlow: {
    twenties: string;
    forties: string;
    sixties: string;
    summary: string;
  };
  recommendations: {
    directions: string;
    colors: string;
    careers: string;
    cautions: string;
  };
}
