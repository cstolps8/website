const express = require('express');

 const contactMeRoute = require('./contactMe');


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

  return router;
};
