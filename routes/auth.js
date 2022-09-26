/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/
const { Router } = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middleware/validar-campos')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarJWT } = require('../middleware/validar-jwt')

const router = Router()


router.post(
  '/new',
  [
    check('name', 'El nombre el obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'el password debe ser de más de 5 caracteres').isLength({min: 6}),
    validarCampos
  ],
  crearUsuario)

router.post(
  '/',
  [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser de más de 5 caracteres').isLength({min: 6}),
    validarCampos
  ],
   loginUsuario)

router.get('/renew', validarJWT, revalidarToken)

module.exports = router;