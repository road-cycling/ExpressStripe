const express       = require('express'),
      ejs           = require('ejs'),
      bodyParser    = require('body-parser'),
      keys          = require('./config/keys.js'),
      stripe        = require('stripe')(keys.stripePrivKey),
      app           = express();



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('home', {stripePublishKey: keys.stripePubKey});
})

app.post('/charge', (req, res) => {
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

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server Has Started`);
});