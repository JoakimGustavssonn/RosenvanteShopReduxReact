
const data = require('./db.json')
const nodemailer = require('nodemailer')
const express = require('express');
const { body, validationResult } = require('express-validator');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const config = require('./config');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;





const app = express();
const router = express.Router();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const oauth2Client = new OAuth2(
  config.clientId, // ClientID
  config.clientSecret, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: config.refreshToken
});
const accessToken = oauth2Client.getAccessToken();

console.log("Before transporter");

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    accessToken: accessToken,
    ...config
    
  }
  
});

console.log("After transporter");
// verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
    console.log("Error equals true");
  } else {
    console.log("Server is ready to take our messages");
  }
});


 

router.post('/api/postmessage', [

  
body('email').isEmail(),
body('meddelande').isLength({ min: 5 })
], (req, res) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }

            let mail = {
              from: req.body.email,
              subject: req.body.subject,
              text: req.body.meddelande
                    }
              var mailOption = {
                from: `${mail.from} <noreply@rosenvanteshop.se>`, // sender address
                to: 'rosenvanteshop@gmail.com',
                replyTo: `${mail.from}`,
                subject: mail.subject,
                text: mail.text
                  }


                    transporter.sendMail(mailOption, (err, info ) => {
                    
                      tls: {
                        rejectUnauthorized: false
                      }
                      if (err) 
                      {
                        res.send('failure' + info)
                      }
                      else {
                        res.send('success')
                      }
                        

                    })


         });


// API calls
router.get('/api/products', (req, res) => {
  res.json((data.products));
});

/*router.get('/api/products', function(req, res, next) {
  const data = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

  res.json((data.products));

});
*/
app.use('/.netlify/functions/server', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);