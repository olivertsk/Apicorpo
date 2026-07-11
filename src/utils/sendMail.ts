import path from 'path'
import * as fs from 'node:fs'
import * as nodeMailer from 'nodemailer'
const handlebars = require('handlebars')

const sendEmail = 'noreply@corpoindustri.com'
const transporter = nodeMailer.createTransport({
  host: 'smtp.dreamhost.com',
  port: 465,
  secure: true,
  auth: {
    user: sendEmail,
    pass: 'CorpoMailWeb123!',
  },
})
handlebars.registerHelper('eq', function (a: any, b: any) {
  return a === b
})

// También puedes agregar otros helpers si los necesitas, por ejemplo:
handlebars.registerHelper('gt', function (a: any, b: any) {
  return a > b
})

export const fxSendMail = (data: any, email: string, subject: string) => {
  const templatePath = path.join(__dirname, `../view/${email}.handlebars`)
  const htmlTemplate = fs.readFileSync(templatePath, 'utf-8')
  const compiledTemplate = handlebars.compile(htmlTemplate)
  const correoHTML = compiledTemplate(data)

  let mail = {
    from: 'Corpoindustri' + '<' + sendEmail + '>',
    to: data.email,
    subject,
    html: correoHTML,
  }

  transporter.sendMail(mail, (error: any, _info: any) => {
    if (error) {
      console.error('Error sending email: ', error)
    } //end if
    else {
      console.log('Email sent.')
    } //end else
  })
}
export const sendTemplate = (html: any, emails: string[]) => {
  let mail = {
    from: 'Corpoindustri' + '<' + sendEmail + '>',
    to: emails,
    subject: 'Newsletter',
    html: html,
  }

  transporter.sendMail(mail, (error: any, _info: any) => {
    if (error) {
      console.error('Error sending email: ', error)
    } //end if
    else {
      console.log('Email sent.')
    } //end else
  })
}
