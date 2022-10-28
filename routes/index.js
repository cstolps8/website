const express = require('express');


// update routes here when a new one is needed
const contactMeRoute = require('./contactMe');
const articlesRoute = require('./articles');
const workHistoryRoute = require('./workhistory');


const router = express.Router();

module.exports = params => {
  const { articleService, workHistoryService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const article = await articleService.getData();
      const workHistory = await workHistoryService.getData();

      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        article,
        workHistory,

      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/contactMe', contactMeRoute(params));
  router.use('/articles', articlesRoute(params));
  router.use('/workhistory', workHistoryRoute(params));


  return router;
};
