const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`El rol ${role} no existe en la base de datos`);
    }
}

const emailExists = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El correo ${email} ya fue registrado`);
    }
}

const userIDExists = async (id) => {
    const idExists = await User.findById(id);
    if (!idExists) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    isValidRole,
    emailExists,
    userIDExists
}