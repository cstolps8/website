const { response } = require('express');
const express = require('express');

// const { check, validationResult } = require('express-validator');

const router = express.Router();


module.exports = params => {
    
    const { articleService } = params;

    router.get('/', async (request, response, next) => {
        try {
            const articles = await articleService.getData();
            console.log(articles)
            console.log("calling root")
            const errors = request.session.articles ? request.session.articles.errors : false;
            const successMessage = request.session.articles ? request.session.articles.message : false;
            
            request.session.articles = {};
            
            return response.render('layout', {
                pageTitle: 'Articles',
                template: 'articles',
                articles,
                errors,
                successMessage,
            });
        } catch (err) {
            return next(err);
        }
    });
    
    // should be using slug and storing the slug for better looking urls
    router.get('/:title', async (request, response, next) => {
        try {
            const articles = await articleService.getArticleByTitle(request.params.title);
            console.log(articles)
            
            const errors = request.session.articles ? request.session.articles.errors : false;
            const successMessage = request.session.articles ? request.session.articles.message : false;
            return response.render('layout',{
                pageTitle: 'Articles',
                template: 'articles',
                articles,
                errors,
                successMessage,
            })
        } catch (err) {
            return next(err)
        }
    })


    return router

}
