import { type Fortune, type InsertFortune } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createFortune(fortune: InsertFortune): Promise<Fortune>;
  getAllFortunes(): Promise<Fortune[]>;
}

export class MemStorage implements IStorage {
  private fortunes: Map<string, Fortune>;

  constructor() {
    this.fortunes = new Map();
  }

  async createFortune(insertFortune: InsertFortune): Promise<Fortune> {
    const id = randomUUID();
    const fortune: Fortune = { 
      ...insertFortune, 
      id,
      timestamp: new Date()
    };
    this.fortunes.set(id, fortune);
    return fortune;
  }

  async getAllFortunes(): Promise<Fortune[]> {
    return Array.from(this.fortunes.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }
}

export const storage = new MemStorage();
