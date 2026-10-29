// Sample question 5: different messages for the /home and /about routes.
const http = require('http');

const pages = {
    '/': ['Welcome to Vitality Now', 'Node.js is serving this Health & Wellness blog.'],
    '/home': ['Home', 'Welcome home. Today\'s tip: drink a glass of water before every meal.'],
    '/about': ['About', 'Vitality Now shares simple, evidence-based health and wellness advice.']
};

const server = http.createServer((req, res) => {
    const page = pages[req.url];
    const status = page ? 200 : 404;
    const [title, message] = page || ['Not Found', `No page exists at ${req.url}`];
    res.writeHead(status, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<head><title>${title}</title></head>
<body>
    <h1>${title}</h1>
    <p>${message}</p>
    <p>Request URL: ${req.url}</p>
    <p>Request Method: ${req.method}</p>
</body>
</html>`);
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
