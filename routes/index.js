const express = require('express');

// const speakersRoute = require('./speakers');
// const feedbackRoute = require('./feedback');
// const fbResultRoute = require('./fbResult');
// const loginRoute = require('./login');

//const contactMe = require('./contactMe')

const router = express.Router();

module.exports = params => {
  const { speakersService } = params;

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

//   router.use('/speakers', speakersRoute(params));
//   router.use('/feedback', feedbackRoute(params));
//   router.use('/fbResult', fbResultRoute(params));
//   router.use('/login', loginRoute(params));


   //router.use('/contactMe', loginRoute(params));



  return router;
};
