const express = require('express');

const router = express.Router();

module.exports = params => {

    const { workHistoryService } = params;

    router.get('/', async (request, response, next) => {

        try {
            const workHistory = await workHistoryService.getData();

            const errors = request.session.workHistory ? request.session.workHistory.errors : false;
            const successMessage = request.session.workHistory ? request.session.workHistory.successMessage : false;

            return response.render('layout', {
                pageTitle: 'Work History',
                template: 'workhistory',
                workHistory,
                errors,
                successMessage
            });

        } catch (err) {
            return next(err)
        }


    });

    router.get('/:id', async (request, response, next) => {

        try {


            const workHistory = await workHistoryService.getWorkHistoryById(request.params.id)


            const errors = request.session.id ? request.session.workHistory.errors : false;
            const successMessage = request.session.id ? request.session.workHistory.successMessage : false;

            return response.render('layout', {
                pageTitle: 'Work History',
                template: 'workhistory',
                workHistory,
                errors,
                successMessage
            })

        } catch (err) {
            return next(err)
        }
    });

    return router;
};
