const jwt = require('jsonwebtoken');

const {BadRequestError} = require('../errors');

const login = async (req, res) => {
    const { username, password } = req.body;
    // This is check in controller other ways are 
    // Mongoose validation , JOI
    if (!username || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({ 'msg': 'user created', 'token': token });
}

const dashboard = async (req, res) => {
    // console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.json({ 'msg': `Hello ${req.user.username}`, 'secret': `Authorised data is ${luckyNumber}` });
    

}
module.exports = {
    login, dashboard
};