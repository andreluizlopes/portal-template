import { Router } from 'express'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'

import creds from '../emailconfig'

const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com',
  port: 465,
  secure: true,
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
})

export default Router()
  .use(bodyParser.json())
  .post('/send-email', (req, res, next) => {
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    const subject = req.body.subject
    const message = req.body.message

    const mail = {
      from: `${email}`,
      to: `escale.portaldeplanos@gmail.com`,
      subject: `${subject}`,
      html: `
      <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
       <td>
        De: ${name} (${email}, ${phone})
        <br>
        <h3>"${subject}"</h3>
       </td>
      </tr>
      <tr>
       <td style="padding: 20px 0 30px 0;">
        ${message}
       </td>
      </tr>
     </table>
      `
    }

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })
