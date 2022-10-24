const express = require('express');

// const { check, validationResult } = require('express-validator');

const router = express.Router();




router.get('/', async (request, response, next) => {

    try {

        const errors = request.session.articles ? request.session.articles.errors : false;

        const successMessage = request.session.articles ? request.session.articles.message : false;
  
        request.session.articles = {};
  
        return response.render('layout', {
          pageTitle: 'Articles',
          template: 'articles',
         // articles,
          errors,
          successMessage,
        });
    } catch (err) {
        return next(err);
    }
});





module.exports = router