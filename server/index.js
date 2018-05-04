const express = require('express');
var bodyParser = require("body-parser");
const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

const mockData = [{ lat: 50.577171, lng: 20.435938 }, { lat: 50.537171, lng: 20.465938 }];

var server = app.listen(8080, function() {
    console.log('Ready on port %d', server.address().port);
});


const key = 'deals';
var deals = {};
deals[key] = [];

    app.use(bodyParser())
        .post('/adddeal', function(req, res) {
            //  console.log(req.body) // populated!
            var lat = req.body.current["7b138ae55693cdfda5bf88c8b8c8de7df332a3f8_lat"];
            var long = req.body.current["7b138ae55693cdfda5bf88c8b8c8de7df332a3f8_long"];
            var status = req.body.current["status"];
            var user_id = req.body.current["user_id"];
            var value = req.body.current["user_id"];


            if (status == 'won'){
                var data = {
                    user_id: user_id,
                    status: status,
                    value: value,
                    lat:lat,
                    long:long
                };
                deals[key].push(data);
            }
            res.end('OK');
        })
        .listen(PORT,() => console.log("test"));

    console.log(deals);

app.get('/deals', function(req, res) {
  res.send(deals);
});
