const { response } = require('express');

const User = require('../models/user');

const usersGet = (req, res = response) => {

    const {q, name = 'No name', apikey, page = 1, limit} = req.query;

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

const usersPost = async(req, res) => {

    const body = req.body;
    const user = new User(body);

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