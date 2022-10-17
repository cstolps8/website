const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const validations = [
  check('name')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('A name is required'),
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('A valid email address is required'),
  check('phoneNumber')
    .trim()
    .isMobilePhone()
    .withMessage('A phone number is required'),
  check('dateOfParty')
    .isDate()
    .escape()
    .withMessage('A date is required'),

];

module.exports = params => {
  const { contactMeService } = params;

  router.get('/', async (request, response, next) => {
    try {
     // const contactMe = await contactMeService.getList();

      const errors = request.session.contactMe ? request.session.contactMe.errors : false;

      const successMessage = request.session.contactMe ? request.session.contactMe.message : false;

      request.session.feedback = {};

      return response.render('layout', {
        pageTitle: 'ContactMe',
        template: 'contactMe',
      //  contactMe,
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

      const { entry, name, email, phoneNumber, dateOfParty, receivePromos, receiveTexts } = request.body;
      await contactMeService.addEntry(entry, name, email, phoneNumber, dateOfParty, receivePromos, receiveTexts);
      request.session.contactMe = {
        message: 'Thank you for your contactMe!',
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
      const { entry, name, email, phoneNumber, dateOfParty, receivePromos, receiveTexts } = request.body;
      await contactMeService.addEntry(entry, name, email, phoneNumber, dateOfParty, receivePromos, receiveTexts);
      const contactMe = await contactMeService.getList();
      return response.json({ contactMe, successMessage: 'Thank you for your Reaching out!' });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
