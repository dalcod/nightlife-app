var express = require("express");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var request = require('request');
var path = require('path');

var User = require("./model/user");
var Token = require("./model/token");
var Sel = require("./model/selected");
var key = require("./secretKey");
var authToken = '';

var router = express.Router();

/* var clientID = 'XvkbyZMYEH5_3t0kqIc2MA';
var secret = 'p68pmxhvflo9obYuMFeSYdOz4GFdkjTh483M6sqWAe5O0HmXJ6mJfnhfwPj5ewKF';
router.get('/auth-token', function(req, res, next){
    request.post({url:'https://api.yelp.com/oauth2/token',
                  form: {"client_id": clientID,
                         "client_secret":  secret,
                         "grant_type": "client_credentials"}},
                 function(err,httpResponse,body){
        if (err) return console.error(err);
        return res.end(body);
    });
}); */

router.get('/auth-token', function(req, res, next){
    Token.find({}, function(err, data){
        if (err) return res.status(500).send(err);
        if(data){
            authToken = data[0].access_token;
            res.end();
        }
    });
});

router.get('/locals/:city', function(req, res, next){
    var city = req.params.city;

    // A tutti gli effetti sì può considerare il codice quì sotto come un server a sé stante o 'proxy server' che siede all'interno del server principale.
    // La funzione di questo server è di effeuare 'http client requests' bypassando così le restrizioni "CORS" dei browser moderni che non consentono di effettuare richieste 'cross-origin' tramite il browser (es: '$.ajax()'), se il server, a cui è destinata la richiesta, abbia disabilitato questa funzione. Utilizzando il sistema definito quì sotto, invece, utilizzaremo un server per effettuare la richiesta, il quale, non essendo collegato ad alcun browser, è libero di richiedere ad altri server le risorse/documenti necessari al funzionamento dell'applicazione.
    request.get({url:'https://api.yelp.com/v3/businesses/search?location=' + city + '&categories=nightlife&limit=50',
                 'auth': {'bearer': authToken}},
                function(err,httpResponse,body){
        if (err) return res.status(500).send(err);
        return res.json(body);
    });
});

router.get('/selected/:username', passport.authenticate('jwt', {session: false}), function(req, res, next){
    var username = req.params.username;
    Sel.findOne({username: username}, function(err, data){
        if (err) return res.status(500).send(err);
        // fare attenzione viene ritornato l'intero documento.
        return res.json(data);
    });
});

router.put('/selected/:username', passport.authenticate('jwt', {session: false}), function(req, res, next){
    // req.body conterrà l'inntero documento con al suo interno le 'selezioni' già aggiornate da inserire nel database.
    var sel = req.body;
    var username = req.params.username;
    Sel.findOneAndUpdate({username: username}, sel, function(err){
        if (err) return res.status(500).send(err);
        return res.json({success: "Document has been updated."})
    });
});

/*-------------------- User Authentication/Registration --------------------*/

router.post("/login",function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(err, user){
        if (err) return res.status(500).send(err);
        if (!user) {
            return res.json({error: "No such user found."});
        }
        user.checkPassword(password, function(err, isMatch){
            if (err) return res.status(500).send(err);
            if (isMatch) {
                var payload = {id: user._id};
                var token = jwt.sign(payload, key.secretKey);
                Sel.findOne({username: username}, function(err, data){
                    if (err) return res.status(500).send(err);
                    return res.json({success: true, token: token, data: data});
                });
            } else {
                res.json({error: "Password doesn't match."})
            }
        });
    });
});

router.post("/signup", function(req, res, next){
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;
    }
    User.findOne({username: username}, function(err, user){
        if (err) return res.status(500).send(err);
        if (user) {
            return res.json({message: "This user already exists"});
        } else {
            var newUser = new User({
                username: username,
                password: password
            })
            newUser.save()
                .then(() => {
                User.findOne({username: username}, function(err, user){
                    if (user) {
                        var payload = {id: user._id};
                        var token = jwt.sign(payload, key.secretKey);
                        var newSel = new Sel({
                            username: username,
                            selections: []
                        });
                        newSel.save(function(err, done){
                            if (err) return res.status(500).send(err);
                            res.json({success: true, token: token});
                        });
                    } else {
                        res.json({success: false, message: 'Cannot set _id. No user found.'});
                    }
                })
            });
        }
    });
});

router.get(["/",
            "/home",
            "/signup",
            "/login"], function(req, res){
    return res.sendFile('index.html', {root: path.join(__dirname, '/dist')});
});

module.exports = router;