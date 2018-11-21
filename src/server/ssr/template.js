// html skeleton provider
function template(title, initialState = {}, content = '') {
  const scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src="/client.js"></script>
                `;
  const page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
                <title> ${title} </title>
                <link
                  rel="stylesheet"
                  href="/bootstrap/css/bootstrap.min.css"
                />
                <link rel="stylesheet" href="/style.css">
                <script src="/jquery.min.js"></script>
                <script src="/bootstrap/js/bootstrap.min.js"></script>
              </head>
              <body>
                <div class="content">
                   <div id="app">${content}</div>
                </div>
                  ${scripts}
              </body></html>
              `;
  return page;
}

module.exports = template;
