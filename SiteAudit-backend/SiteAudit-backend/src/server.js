import express from 'express';
import cors from 'cors';
import siteRoutes from './routes/siteRoutes.js';
import crawlRoutes from './routes/crawlRoutes.js';
import issueRoutes from './routes/issueRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/sites', siteRoutes);
app.use('/api/crawls', crawlRoutes);
app.use('/api/issue-types', issueRoutes);

app.get('/', (req, res) => {
  res.json({
    name: 'Site Audit API',
    version: '1.0.0',
    description: 'Mock backend for site audit system (Ahrefs-style)',
    endpoints: {
      sites: '/api/sites',
      crawls: '/api/crawls',
      issueTypes: '/api/issue-types',
      health: '/health'
    },
    documentation: 'See API-DOCUMENTATION.md for full API reference'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});


app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║        Site Audit API Server                      ║
║        Running on http://localhost:${PORT}        ║
║                                                   ║
║                                                   ║
║        Readme: README.md                          ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
  `);
});

export default app;
