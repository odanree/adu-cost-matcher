import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'ADU Builder API',
    version: '0.1.0',
    status: 'running',
    endpoints: {
      health: '/health',
      calculate: '/api/calculate'
    }
  });
});

// API endpoint - Cost calculation
app.post('/api/calculate', (req: Request, res: Response) => {
  try {
    const { sqft, bedrooms } = req.body;
    
    // Validate input
    if (!sqft || typeof sqft !== 'number' || sqft <= 0) {
      return res.status(400).json({ error: 'Invalid square footage' });
    }
    
    if (!bedrooms || typeof bedrooms !== 'number' || bedrooms <= 0) {
      return res.status(400).json({ error: 'Invalid number of bedrooms' });
    }
    
    // Simple cost calculation (placeholder)
    const baseCost: number = sqft * 150;
    const bedroomCost: number = bedrooms * 5000;
    const totalCost: number = baseCost + bedroomCost;
    
    res.json({
      sqft,
      bedrooms,
      costs: {
        base: baseCost,
        bedrooms: bedroomCost,
        total: totalCost
      }
    });
  } catch (error: unknown) {
    console.error('Error in /api/calculate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ADU Builder API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/calculate`);
});

export default app;
