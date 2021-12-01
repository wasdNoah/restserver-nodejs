const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = (req, res = response) => {

    const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const usersPut = (req, res) => {

    const { id } = req.params;

    res.status(400).json({
        msg: 'put API - controlador',
        id
    });
}

const usersPost = async (req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //check if email already exists
    const salt = bcryptjs.genSaltSync();
    
    //encrypt password
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