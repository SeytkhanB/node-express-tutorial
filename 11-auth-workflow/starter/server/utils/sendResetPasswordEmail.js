import sendEmail from "./sendEmail.js";

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetPassword = `${origin}/user/reset-password?token=${token}&email=${email}`;

  const message = `<p>Please reset password by clicking on the following link: 
    <a href="${resetPassword}">RESET PASSWORD</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Reset password",
    html: `
      <h4>Hello, ${name}!</h4>
      ${message}
    `,
  });
};

export default sendResetPasswordEmail;
