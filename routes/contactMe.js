const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const validations = [
  check('fname')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A first name is required'),
  check('lname')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A last name is required'),
  check('email')
    .trim()
    .isEmail()
    .withMessage('A valid email address is required'),
  check('comment')
    .trim()
    .isLength({ min: 3 })
    .withMessage("Please leave a Message"),

];

module.exports = params => {
  const { contactMeService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const contactMe = await contactMeService.getList();

      const errors = request.session.contactMe ? request.session.contactMe.errors : false;

      const successMessage = request.session.contactMe ? request.session.contactMe.message : false;

      request.session.contactMe = {};

      return response.render('layout', {
        pageTitle: 'ContactMe',
        template: 'contactMe',
        contactMe,
        errors,
        successMessage,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.contactMe = {
          errors: errors.array(),
        };
        return response.redirect('/contactMe');
      }

      const { fname, lname, email, comment } = request.body;
      await contactMeService.addEntry(fname, lname, email, comment);
      request.session.contactMe = {
        message: 'Thank you for contacting me!',
      };
      return response.redirect('/contactMe');
    } catch (err) {
      return next(err);
    }
  });

  router.post('/api', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.json({ errors: errors.array() });
      }
      const { fname, lname, email, comment } = request.body;
      await contactMeService.addEntry(fname, lname, email, comment);
      const contactMe = await contactMeService.getList();
      return response.json({ contactMe, successMessage: 'Thank you for Reaching out!' });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
