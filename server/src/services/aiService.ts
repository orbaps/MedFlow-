// Mock AI Service - In a real app, this would call a Python Flask/FastAPI service

export const predictDemand = async (medicineId: string) => {
    // Simulate ML model latency
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock prediction logic based on random factors
    const predictedGrowth = Math.floor(Math.random() * 30) + 5; // 5% to 35% growth
    const confidenceScore = (Math.random() * 0.2 + 0.8).toFixed(2); // 0.80 to 0.99

    return {
        medicineId,
        predictedGrowth: `${predictedGrowth}%`,
        confidenceScore,
        recommendation: predictedGrowth > 20 ? 'Increase Stock' : 'Maintain Stock',
        nextMonthDemand: Math.floor(Math.random() * 500) + 100,
    };
};

export const analyzeExpiryRisk = async (hospitalId: string) => {
    // Simulate ML model latency
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
        hospitalId,
        riskLevel: 'High',
        atRiskValue: 280000, // ₹2.8 Lakhs
        expiringBatches: 4,
        optimizationStrategy: 'Transfer to nearby retailer',
    };
};
