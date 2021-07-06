const sgMail = require('@sendgrid/mail');
const Mailgen = require('mailgen');
require('dotenv').config();
class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  #createTemplate(verifyToken, name) {
    mailGenerator = new this.#GenerateTemplate({
      theme: 'default',
      link: 'http://localhost:3000/',
    });
    const template = {
      body: {
        name,
        intro: "Welcome to Systen Contacts! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with Mailgen, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010',
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
  }
  async sendEmail(verifyToken, email, name) {}
}

module.exports = EmailService;
