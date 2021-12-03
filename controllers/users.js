const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const users = await User.find()
        .skip(Number(from))
        .limit(Number(limit));

    res.json({
        users
    });
}

const usersPut = async (req, res) => {

    const { id } = req.params;
    const {_id, password, google, email, ...body } = req.body;

    if (password) {
        //encrypt password
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, body);

    res.json(user);
}

const usersPost = async (req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //save to database
    await user.save();

    res.json({
        user
    });
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete
}