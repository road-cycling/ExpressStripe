const express       = require('express'),
      ejs           = require('ejs'),
      bodyParser    = require('body-parser'),
      chargeRoute   = require('./routes/charge.js'),
      app           = express();



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(chargeRoute);

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server Has Started`);
});