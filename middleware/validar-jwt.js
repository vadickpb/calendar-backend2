const {response} = require('express')
const jwt = require('jsonwebtoken') 

const validarJWT = (req, res = response, next) => {
  const token = req.header('x-token')

  //validar que existe el token
  if(!token) {
    return res.status(401).json({
      ok: false,
      msg: 'no enviaste ningún token'
    })
  }

  try {
    const {uid, name} = jwt.verify(
      token,
      process.env.JWT_SECRET_SEED
    )

    req.uid = uid;
    req.name = name;
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msn: 'token no válido'
    })
    
  }
  next()
  
}

module.exports = {
  validarJWT
}