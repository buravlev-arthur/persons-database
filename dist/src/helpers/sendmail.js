import nodemailer from 'nodemailer';
export default async (text) => {
    if (!text.length) {
        return new Error();
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    await transporter.sendMail({
        from: `"Persons database feedback" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_TO,
        subject: 'Feedback from persons database site',
        text,
    });
    return { ok: true };
};
