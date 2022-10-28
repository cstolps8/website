const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const session = require('express-session')
const bodyParser = require('body-parser');


const ContactMeService = require('./services/ContactMeService')
const contactMeService = new ContactMeService('./data/contactMe.json')


const ArticleService  = require('./services/ArticlesService')
const articleService = new ArticleService('./data/articles.json')

const WorkHistoryService = require('./services/WorkHistoryService')
const workHistoryService = new WorkHistoryService('./data/workHistory.json')

const routes = require('./routes');

const app = express();

app.locals.siteName = 'Collin Stolpa';

const port = 80;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Ghdur687399s7w', 'hhjjdf89s866799'],
  })
);

app.use(session({
  secret: 'Keep it secret',
  name: 'uniqueSessionID',
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Collin Stolpa';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const articles = await articleService.getData();
    const workHistory = await workHistoryService.getData();

    response.locals.articles = articles;
    response.locals.workHistory = workHistory;
    return next();
  } catch (err) {
    return next(err);
  }
});



app.use(
  '/',
  routes({
    contactMeService,
    articleService,
    workHistoryService,

  })
);


app.use((request, response, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
