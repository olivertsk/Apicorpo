import path from 'path'
import * as fs from 'node:fs'
import * as nodeMailer from 'nodemailer'
// const nodeMailer = require('nodemailer')
const handlebars = require('handlebars');

const sendEmail = 'admin@amarillasapp.com'
// info@checardirectorio.com
// Checar1*
// const adminEmail = 'italobelen1995@gmail.com'
const transporter = nodeMailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: sendEmail,
    pass: 'Neuron1.0',
  },
})
export const fxSendMail = (data: any, email: string, subject: string) => {
  const templatePath = path.join(__dirname, `../view/${email}.handlebars`)
  console.log('templatePath :>> ', templatePath);
  const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

  const compiledTemplate = handlebars.compile(htmlTemplate);
  console.log('data :>> ', data);
  const correoHTML = compiledTemplate(data);
  let mail = {
      from: sendEmail,
      to: data.email,
      subject,
      html: correoHTML
  }
  
  transporter.sendMail(mail, (error: any, info: any) => {
      if(error) {
          console.error("Error sending email: ", error);
      }//end if
      else {
          console.log("Email sent.");
      }//end else
      console.log('info :>> ', info);
  })
}
export const sendTemplate = (html: any, emails: string[]) => {
console.log('html :>> ', html)
  let mail = {
      from: 'desarrollo@lahercreative.com',
      to: emails,
      subject: "Newsletter",
      html: html
  }
  
  transporter.sendMail(mail, (error: any, info: any) => {
      if(error) {
          console.error("Error sending email: ", error);
      }//end if
      else {
          console.log("Email sent.");
      }//end else
      console.log('info :>> ', info);
  })
}