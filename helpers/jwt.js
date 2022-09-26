const jwt = require('jsonwebtoken')

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => { 
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_SEED,
      {
        expiresIn: '2h'
      },
      (err, token)=> {
        if (err) {
          console.log(err);
          reject('no se puso generar el token')
        }
        resolve(token)
      }
    )
   })
}


module.exports = {
  generateJWT
}