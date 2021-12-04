const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { isValidRole, emailExists, userIDExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const { usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch } = require('../controllers/users');

router.get('/', usersGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userIDExists),
    check('role').custom(isValidRole),
    validateFields
], usersPut);

router.post('/', [
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    check('password', 'El password debe tener al menos 5 caracteres').isLength({ min: 5 }),
    check('email', 'El formato del correo no es válido').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], usersPost);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(userIDExists),
    validateFields
], usersDelete);

router.patch('/', usersPatch);

module.exports = router;