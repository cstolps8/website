const express = require('express');


// update routes here when a new one is needed
const contactMeRoute = require('./contactMe');
const articlesRoute = require('./articles');


const router = express.Router();

module.exports = params => {
  const { articleService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const article = await articleService.getData();

      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        article,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/contactMe', contactMeRoute(params));
  router.use('/articles', articlesRoute(params));

  return router;
};
