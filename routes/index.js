const express = require('express');


// update routes here when a new one is needed
 const contactMeRoute = require('./contactMe');
 const articlesRoute = require('./articles');


const router = express.Router();

module.exports = params => {
  const { contactMe } = params;

  router.get('/', async (request, response, next) => {
   // return response.render('index')
    try {
    //   const artwork = await speakersService.getAllArtwork();
    //   const topSpeakers = await speakersService.getList();
      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        //topSpeakers,
        //artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

   router.use('/contactMe', contactMeRoute(params));
   router.use('/articles', articlesRoute)

  return router;
};
