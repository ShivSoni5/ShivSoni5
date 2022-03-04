
const Mustache = require('mustache');
const fetch = require('node-fetch');
const fs = require('fs');

const MUSTACHE_MAIN_DIR = './main.mustache';

const DATA = {};

async function setQuoteOfTheDay() {
  await fetch(
    `http://quotes.stormconsultancy.co.uk/random.json`
  )
    .then(r => r.json())
    .then(quoteInfo => {
      DATA.author = quoteInfo.author;
      DATA.quote = quoteInfo.quote;
    });
}

async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {
  await setQuoteOfTheDay();

  await generateReadMe();
}

action();