export default body => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="app">${body}</div>
    </body>
  </html>
  <script src="/bundle.js" defer></script>
`
