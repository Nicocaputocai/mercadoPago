var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000
const mercadopago = require ('mercadopago');

var app = express();
 // Agrega credenciales
mercadopago.configure({
    access_token: 'PROD_ACCESS_TOKEN'
  });
  // Crea un objeto de preferencia
  class Mp{
  async mercadopago({request}){
  let preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };
  
  const res = await mercadopago.preferences.create(preference)

  return res
    }
  }
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});
app.post('api/v1/mercadopago', Mp)

app.listen(port);