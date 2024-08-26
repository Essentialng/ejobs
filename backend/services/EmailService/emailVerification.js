import nodemailer from 'nodemailer';
import {VERIFICATION_EMAIL_TEMPLATE} from '../../utils/emailTemplates.js'


const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'petersonzoconis@gmail.com',
    pass: 'hszatxfpiebzavdd'
  }
});


// -----------verification email----------------
export const sendVerificationEmail = (recipientEmail, verificationLink) => {
  const mailOptions = {
    from: 'petersonzoconis@gmail.com',
    to: recipientEmail,
    subject: 'Verify your email',
    html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationLink)
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      if (error.code === 'EAUTH') {
        console.error('Error sending email: Invalid login credentials');
        // Provide a user-friendly error message or retry the email sending
      } else {
        console.error('Error sending email:', error);
      }
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};


// ---------forget pasword email----------------
export const forgetPasswordEmail = (email, verificationLink)=>{
  const mailOptions = {
    from: 'petersonzoconis@gmail.com',
    to: email,
    subject: 'Verify your email',
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', verificationLink)
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      if (error.code === 'EAUTH') {
        console.error('Error sending email: Invalid login credentials');
        // Provide a user-friendly error message or retry the email sending
      } else {
        console.error('Error sending email:', error);
      }
    } else {
      console.log('Email sent: ', info.response);
    }
  });

}