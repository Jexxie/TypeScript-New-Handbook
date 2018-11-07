import express = require('express');
import staticy = require('staticy');
import path = require('path');
import render  = require('./render');

const home = path.join(__dirname, "..");

const app = express();
const stat = staticy();

app.use(stat);

stat.addTransformedFolder(home, "/", (content => staticy.injectReloadScript(render.makePage(render.render(content)))), { filePattern: "*.md", extensionMap: { ".md": ".html" } });
stat.addStaticFolder(home, "/", { filePattern: ["*.css", "*.js"] });

const port = 62997;
app.listen(port);
console.log(`Listening at http://localhost:${port}...`);

setTimeout(() => stat.ls(), 600);