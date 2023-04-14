/* eslint-disable no-unused-vars */
import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
  const { nombre, email, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
    // host: 'smtp.mailtrap.io',
    // port: 2525,
    // auth: {
    //   user: '7f888a1604a9bc',
    //   pass: 'e172469e415214'
    // }
  })

  // send mail with defined transport object
  const info = await transport.sendMail({
    from: '"UpTasks 👻 Administrador de Proyecto" <foo@uptask.com>', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔ - Comprueba tu cuenta', // Subject line
    text: 'Comprueba tu cuenta en UpTask', // plain text body
    html: ` <p>Hola: ${nombre} Comprueba tu cuenta en UpTask</p>
    <p>Tu ceuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:</p>

    <a href='${process.env.FRONTEND_URL}/confirmarCuenta/${token}'>Comprobar cuenta</a>

    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>

    ` // html body
  })
}

// ========================================================
export const emailOlvidePAssword = async (datos) => {
  const { nombre, email, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // send mail with defined transport object
  const info = await transport.sendMail({
    from: '"UpTasks 👻 Restablese tu password" <foo@uptask.com>', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔ - Restablese tu password', // Subject line
    text: 'Restablese tu password', // plain text body
    html: ` <p>Hola: ${nombre} has solicitado reestablecer tu password</p>
    <p>Sigue el siguiente enlace para generar un nuevo password:</p>

    <a href='${process.env.FRONTEND_URL}/nuevoPassword/${token}'>Restablese tu password</a>

    <p>Si tu no solicistaste este email, puedes ignorar el mensaje</p>

    ` // html body
  })
}
