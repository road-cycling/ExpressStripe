const express = require('express'),
      router  = express.Router(),
      keys    = require('../config/keys.js'),
      stripe  = require('stripe')(keys.stripePrivKey);
      

router.get('/', (req, res) => {
    res.render('home', {stripePublishKey: keys.stripePubKey});
})

router.post('/charge', (req, res) => {
    stripe.customers.create({
        email: req.body.stripeEmail
    }).then( (customer) => {
        return stripe.customers.createSource(customer.id, {
            source: req.body.stripeToken
        });
    }).then((source) => {
        return stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            customer: source.customer
        });
    }).then((charge) => {
        res.render('other', {result: 'Success'});
    }).catch((err) => {
        console.log(err);
        res.render('other', {result: 'Error'});
    });
})

module.exports = router;