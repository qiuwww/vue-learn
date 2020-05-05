const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  // 渲染模板
  template: require('fs').readFileSync('./index.template.html', 'utf-8'),
});

const PORT = `8070`;

server.get('/page/1', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`,
  });

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' }); //设置response编码为utf-8
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `);
  });
});

console.log(`server open on http://localhost:${PORT}`);
server.listen(PORT);
