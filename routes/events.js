/*
  Rutas de Usuarios / Auth
  host + /api/events
*/

const { Router } = require('express')
const { check } = require('express-validator');
const { getEvents, creaTeEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();
//Todas las rutas pasan por validacion de JWT
router.use(validarJWT)

router.get('/', getEvents);

router.post(
  '/',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'la fecha de inicio es obligatoria').not().isEmpty(),
    check('end', 'la fecha de fin es obligatoria').not().isEmpty(),
    validarCampos
  ],
  creaTeEvent);

router.put(
  '/:id',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'la fecha de inicio es obligatoria').not().isEmpty(),
    check('end', 'la fecha de fin es obligatoria').not().isEmpty(),
    validarCampos
  ],
  updateEvent
);

router.delete('/:id', deleteEvent);


module.exports = router