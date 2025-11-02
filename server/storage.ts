import { type Fortune, type InsertFortune, type User, type InsertUser, fortunes, users } from "@shared/schema";
import { db } from "../db/client";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  createFortune(fortune: InsertFortune): Promise<Fortune>;
  getAllFortunes(): Promise<Fortune[]>;
  getFortune(id: string): Promise<Fortune | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUser(username: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createFortune(insertFortune: InsertFortune): Promise<Fortune> {
    const [fortune] = await db.insert(fortunes).values(insertFortune).returning();
    return fortune;
  }

  async getAllFortunes(): Promise<Fortune[]> {
    return await db.select().from(fortunes).orderBy(desc(fortunes.timestamp));
  }

  async getFortune(id: string): Promise<Fortune | undefined> {
    const [fortune] = await db.select().from(fortunes).where(eq(fortunes.id, id)).limit(1);
    return fortune;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getUser(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return user;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }
}

export const storage = new DatabaseStorage();
