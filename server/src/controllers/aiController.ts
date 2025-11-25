import { Request, Response } from 'express';
import { predictDemand, analyzeExpiryRisk } from '../services/aiService';

export const getDemandForecast = async (req: Request, res: Response) => {
    try {
        const { medicineId } = req.params;
        const forecast = await predictDemand(medicineId);
        res.json(forecast);
    } catch (error) {
        res.status(500).json({ message: 'Error generating forecast', error });
    }
};

export const getExpiryRisk = async (req: Request, res: Response) => {
    try {
        const { hospitalId } = req.params;
        const riskAnalysis = await analyzeExpiryRisk(hospitalId);
        res.json(riskAnalysis);
    } catch (error) {
        res.status(500).json({ message: 'Error analyzing risk', error });
    }
};
