const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const crearUsuario = async(req, res = response) => {

  const { name, email, password } = req.body
  try {
    //Validar el email
    let usuario = await Usuario.findOne({email})
    if (usuario) {
      res.status(400).json({
        ok: false,
        msg: "ya existe un usuario con ese correo"
      })
    }
    //instanciar usuario
    usuario = new Usuario(req.body);

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt)
    
    //guardar usuario en la BD
    await usuario.save()

    //generar JWT
    const token = await generateJWT(usuario.id, usuario.name)

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el administrador'
    })
  }
}

const loginUsuario = async(req, res = response) => {
  const { email, password } = req.body
  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({email});

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encuentra un usuario con ese email'
      })
    }
    //comparar contraseñas
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(401).json({
        ok: false,
        msg: 'La contraseña es incorrecta'
      })
    }

    //genera JWT
    const token = await generateJWT(usuario.id, usuario.name)

    res.status(200).json({
      ok: true,
      msg: 'login',
      uid: usuario.id,
      name: usuario.name,
      token
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const revalidarToken = async(req, res) => {

  const { uid, name} = req

  //Generar nuevo token
  const token = await generateJWT(uid, name)

  res.json({
    ok: true,
    msg: 'revalidar token',
    uid,
    name,
    token
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}