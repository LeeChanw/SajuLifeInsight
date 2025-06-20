import { SajuReading, InsertSajuReading } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  createSajuReading(reading: InsertSajuReading): Promise<SajuReading>;
  getSajuReading(id: number): Promise<SajuReading | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private sajuReadings: Map<number, SajuReading>;
  private currentUserId: number;
  private currentReadingId: number;

  constructor() {
    this.users = new Map();
    this.sajuReadings = new Map();
    this.currentUserId = 1;
    this.currentReadingId = 1;
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSajuReading(reading: InsertSajuReading): Promise<SajuReading> {
    const id = this.currentReadingId++;
    const sajuReading: SajuReading = {
      ...reading,
      id,
      createdAt: new Date(),
    };
    this.sajuReadings.set(id, sajuReading);
    return sajuReading;
  }

  async getSajuReading(id: number): Promise<SajuReading | undefined> {
    return this.sajuReadings.get(id);
  }
}

export const storage = new MemStorage();
