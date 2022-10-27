
const fs = require('fs');
const util = require('util');
const slugify = require('slugify')

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const articleFile = "/Users/collinstolpa/ProgrammingFun/myWebsite/website/data/articles copy.json"
const data = fs.readFileSync(articleFile)

let articles = JSON.parse(data)


articles.forEach(article => {
    console.log(article.title)
    article["slug"] = slugify(article.title,{ lower: true, strict: true })
});
writeFile(articleFile, JSON.stringify(articles))

console.log(articles)