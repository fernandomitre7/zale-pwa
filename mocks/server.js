const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookie = require('cookie');

const server = jsonServer.create()
// const router = jsonServer.router('db.json')
const router = jsonServer.router(path.join(__dirname, 'db.json'))

const userdb = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'UTF-8'))
const receiptsdb = JSON.parse(fs.readFileSync(path.join(__dirname, 'receipts.json'), 'UTF-8'))

//server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const API_VERSION = '/v1'
const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}
// Verify the token 
function verifyToken(token) {
    console.log('verifyToken: ', token);
    return jwt.verify(token, SECRET_KEY);
}
// Check if the user exists in database
function isAuthenticated({ username, password }) {
    return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1;
}


server.post(`${API_VERSION}/auth/tokens`, (req, res) => {
    const { username, password } = req.body
    console.log(`[DEBUG] username: ${username}, password: ${password}`);
    if (isAuthenticated({ username, password }) === false) {
        const status = 401
        const message = 'Incorrect username or password'
        res.status(status).json({
            status, message
        });
        return;
    }
    const access_token = createToken({ username, password })

    console.log('access token created = ', access_token);
    const cookie_opt = {
        domain: 'zale.mx',
        //httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    };
    const auth_cookie = cookie.serialize('auth', access_token, cookie_opt);
    const xsrf_cookie = cookie.serialize('XSRF-TOKEN', 'some xsrf token', cookie_opt);
    res.setHeader('Set-Cookie', [auth_cookie, xsrf_cookie]);

    res.status(200).json({
        message: 'Succesful Authentication'
    });
});

server.post(`${API_VERSION}/users/me/transactions`, (req, res) => {
    /*  const receipt = receiptsdb.receipts[0];
     receipt.amount = req.body.amount;
     receipt.created_date = new Date();
     res.status(200).json(receipt); */
    const status = 400
    const message = 'Error making Transaction';
    res.status(status).json({
        status, message
    });
});

server.get(`${API_VERSION}/users/me/receipts`, (req, res) => {
    console.log('GET Receipts');
    const receipts = receiptsdb.receipts;
    let date = new Date();
    receipts.forEach((receipt, i) => {
        receipt.created_date = date.setDate(date.getDate() - i);
    });
    res.status(200).json(receipts);
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    console.log(`Auth middleware url: '${req.baseUrl}'`);
    console.log('Auth middleware req.headers: %o', req.headers);
    /* if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({
            status, message
        })
        return
    } */

    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        verifyToken(cookies.auth);
        next();
    } catch (err) {
        console.error('Error Authenticating %o: ', err);
        const status = 401
        const message = 'Error access_token is revoked'
        res.status(status).json({
            status, message
        })
    }
})

server.use(API_VERSION, router);

server.listen(3000, () => {
    console.log('Runing MOCK API Server at Port 3000');
})