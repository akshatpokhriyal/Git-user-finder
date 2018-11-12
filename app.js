const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index');
})
app.post('/', function (req, res) {

    var id = req.body.id;

    res.redirect('/git/' + id);
})
app.get('/git/:id', function (req, res) {
    var id = req.params.id;
    var url = `api.github.com/users/${id}`;
    request(url, function (err, response) {
        if (err) {
            res.render('git', { output: null, error: 'no result found! Please enter correct Username' })
        }
        else {
            var body = JSON.parse(response.text);

            if (body = undefined) {

                res.render('git', { output: null, error: 'undefined user' })
            }
            else {
                var body = JSON.parse(response.text);
                let username = `Username : ${body.login}`;
                let userlink = body.html_url;
                let userimg = body.avatar_url;


                res.render('git', { output: username, link: userlink, img: userimg, error: null })
            }


        }
    })

})

app.listen(3000, function () {
    console.log('magic happens at port 3000')
})