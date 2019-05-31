let express = require('express');
let app = express();
let port = 8080
let mysql = require('mysql');
let bodyParser = require('body-parser');


// making ejs the view engine
app.set('view engine', 'ejs');

// body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// use public folder middleware
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bookyboo1',
    database: 'join_us'
});

connection.connect()
// HOME ROUTE
app.get('/', (req, res) => {
    // connection.connect();
    let q = 'SELECT COUNT(*) AS count FROM users';
    connection.query(q, (error, results, fields) => {
        if (error) {
            throw error;
        }
        let count = results[0].count;
        // res.send(`We have ${count} in our database`);
        res.render('home', {data: count});
        // connection.end();
    });
});

// ABOUT ROUTE
app.get('/about', (req, res) => {
    // connection.connect();
    let p = 'select email, created_at from users order by created_at limit 1';
    connection.query(p, (error, results, fields) => {
        if (error) {
            throw error;
        }
        console.log(results[0].email);
        let count = results[0].email;
        res.send(`We have ${count} in our database`);
        // connection.end();
    });
});

// JOKE ROUTE
app.get('/joke', (req, res) => {
    let joke = 'here is a joke'
    res.send(joke);
});

// RANDOM NUM ROUTE
app.get('/random_num', (req, res) => {
    let num = Math.floor(Math.random() * 11)
    res.send(`Your random number is ${num}`);
});

// POST REGISTER ROUTE
app.post('/register', (req, res) => {
    // connection.connect();
    let person = {
        email: req.body.email
    };
    let q = 'INSERT INTO users SET ?';
    connection.query(q, person, (error, results, field) => {
        if (error) {
            throw error;
        }
        console.log(results);
        console.log(person);
        // connection.end();
        res.redirect('/');
    });    
});
// connection.end();
// LISTEN FOR CONNECTION
app.listen(process.env.PORT || port, () => {
    console.log(`application is running on port ${port}`);
});