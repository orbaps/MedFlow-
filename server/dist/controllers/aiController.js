"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpiryRisk = exports.getDemandForecast = void 0;
const aiService_1 = require("../services/aiService");
const getDemandForecast = async (req, res) => {
    try {
        const { medicineId } = req.params;
        const forecast = await (0, aiService_1.predictDemand)(medicineId);
        res.json(forecast);
    }
    catch (error) {
        res.status(500).json({ message: 'Error generating forecast', error });
    }
};
exports.getDemandForecast = getDemandForecast;
const getExpiryRisk = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const riskAnalysis = await (0, aiService_1.analyzeExpiryRisk)(hospitalId);
        res.json(riskAnalysis);
    }
    catch (error) {
        res.status(500).json({ message: 'Error analyzing risk', error });
    }
};
exports.getExpiryRisk = getExpiryRisk;
