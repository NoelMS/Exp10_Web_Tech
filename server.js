const http = require('http');

const PORT = process.env.PORT || 3000;

const wellnessTips = [
    { id: 1, category: "Nutrition", tip: "Drink at least 500 ml of water upon waking to kickstart cellular hydration." },
    { id: 2, category: "Fitness", tip: "Engage in 30 minutes of Zone 2 cardio to optimize mitochondrial health." },
    { id: 3, category: "Mindset", tip: "Practice 10 minutes of diaphragmatic breathing before sleep to lower cortisol." },
    { id: 4, category: "Recovery", tip: "Maintain a cool bedroom temperature (65-68 F) for restorative deep sleep." }
];

const communityMetrics = {
    activeMembers: 1420,
    averageWaterMl: 2650,
    mindfulMinutesLogged: 18450,
    averageVitalityScore: 91.4,
    status: "Optimal"
};

const server = http.createServer((req, res) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vitality Now | Server-Side Health Portal</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; font-family: Georgia, Garamond, serif; }
body { background-color: #e8f5e9; color: #333333; }
.hero-banner { background-color: #2c5e3b; text-align: center; padding: 40px 20px; }
.hero-banner h1 { color: #ffffff; letter-spacing: 4px; font-size: 32px; }
.hero-banner p { color: #e8f5e9; font-style: italic; margin-top: 8px; font-size: 16px; }
.nav-bar { background-color: #1b3823; display: flex; justify-content: center; gap: 24px; padding: 12px 0; }
.nav-bar a { color: #ffffff; text-decoration: none; font-size: 15px; }
.content { max-width: 880px; margin: 30px auto; padding: 0 20px; }
.card { background-color: #ffffff; border-radius: 10px; padding: 24px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
.card h2 { color: #2c5e3b; font-size: 22px; margin-bottom: 12px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.card p { margin-bottom: 14px; line-height: 1.6; font-size: 15px; }
.badge { display: inline-block; background-color: #e8f5e9; color: #2c5e3b; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 13px; }
.endpoint-box { background-color: #f9fbf9; border-left: 4px solid #4ca165; padding: 12px 16px; margin: 12px 0; font-family: 'Courier New', monospace; font-size: 14px; }
footer { background-color: #1b3823; color: #ffffff; text-align: center; padding: 18px 0; margin-top: 40px; font-size: 14px; }
</style>
</head>
<body>
<header class="hero-banner">
    <h1>VITALITY NOW</h1>
    <p>Server-Side Web Application Powered by Node.js</p>
</header>
<nav class="nav-bar">
    <a href="/">Home</a>
    <a href="/api/wellness-tips">Wellness Tips API</a>
    <a href="/api/metrics">Health Metrics API</a>
    <a href="/health">Server Status</a>
</nav>
<main class="content">
    <div class="card">
        <h2>Node.js Server-Side Health Portal</h2>
        <p>This web application is delivered dynamically by a custom Node.js server implementing native HTTP request dispatching, header negotiation, and RESTful JSON microservices.</p>
        <span class="badge">Server Port: ${PORT}</span>
        <span class="badge">Runtime: Node.js ${process.version}</span>
        <span class="badge">Status: 200 OK</span>
    </div>
    <div class="card">
        <h2>Available Server Endpoints</h2>
        <div class="endpoint-box">GET / &mdash; Server-Rendered Wellness Portal</div>
        <div class="endpoint-box">GET /api/wellness-tips &mdash; JSON Daily Health Guidelines</div>
        <div class="endpoint-box">GET /api/metrics &mdash; JSON Community Wellness Metrics</div>
        <div class="endpoint-box">GET /health &mdash; Node.js Server Uptime &amp; Health Probe</div>
    </div>
</main>
<footer>
    <p>Vitality Now Health &amp; Wellness Blog</p>
</footer>
</body>
</html>`);
    } else if (req.url === '/api/wellness-tips' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: true, count: wellnessTips.length, data: wellnessTips }, null, 2));
    } else if (req.url === '/api/metrics' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({ success: true, metrics: communityMetrics }, null, 2));
    } else if (req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
            status: "UP",
            uptimeSeconds: Math.floor(process.uptime()),
            timestamp: timestamp,
            nodeVersion: process.version
        }, null, 2));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<!DOCTYPE html>
<html>
<head><title>404 Not Found | Vitality Now</title></head>
<body style="font-family: Georgia, serif; background:#e8f5e9; text-align:center; padding:60px;">
    <h1 style="color:#2c5e3b;">404 - Endpoint Not Found</h1>
    <p>The requested resource does not exist on the Vitality Now Node.js Server.</p>
    <p><a href="/" style="color:#1b3823;">Return to Server Home</a></p>
</body>
</html>`);
    }
});

server.listen(PORT, () => {
    console.log(`Vitality Now server running on http://localhost:${PORT}`);
});
