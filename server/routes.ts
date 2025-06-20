import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sajuInputSchema } from "@shared/schema";
import { SajuCalculator } from "./services/sajuCalculator";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/saju/analyze", async (req, res) => {
    try {
      const input = sajuInputSchema.parse(req.body);
      
      // Calculate four pillars
      const fourPillars = SajuCalculator.calculateFourPillars(input);
      
      // Generate analysis
      const analysis = SajuCalculator.generateAnalysis(fourPillars, input);
      
      // Store the reading
      const reading = await storage.createSajuReading({
        ...input,
        fourPillars,
        analysis,
      });
      
      res.json({
        id: reading.id,
        fourPillars,
        analysis,
      });
    } catch (error) {
      console.error("Saju analysis error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "분석 중 오류가 발생했습니다." 
      });
    }
  });

  app.get("/api/saju/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const reading = await storage.getSajuReading(id);
      
      if (!reading) {
        return res.status(404).json({ message: "사주 분석 결과를 찾을 수 없습니다." });
      }
      
      res.json({
        id: reading.id,
        fourPillars: reading.fourPillars,
        analysis: reading.analysis,
      });
    } catch (error) {
      console.error("Get saju reading error:", error);
      res.status(400).json({ 
        message: "사주 분석 결과를 불러오는 중 오류가 발생했습니다." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
