/**
 * @author HRDVV
 * @email hrd.candy.dev@gmail.com
 * @create date 2020-01-27 21:03:23
 * @modify date 2020-01-27 21:03:23
 * @desc jwt
 */

const jwt = require('jsonwebtoken')
const config = require('./config')

let expiresIn = config.getItem('jwt.expiresIn')
let secret = config.getItem('jwt.secret')

const sign = data => {
  return jwt.sign({ ...data }, secret, { expiresIn })
}

const vertify = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err)
      resolve(decoded)
    })
  })
}

module.exports = {
  sign,
  vertify
}
