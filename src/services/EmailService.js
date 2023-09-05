import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendMailCreateOrder = (email, orderItems) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItems = '';
    const attachmentsImage = [];
    orderItems.forEach((order) => {
        listItems += `<div>
        <div>Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng <b>${order.amount}</b> và giá là <b>${order.price} VND</b></div>
        <div>Bên dưới là hình ảnh sản phẩm</div>
        </div>`;
        attachmentsImage.push({ path: order.image });
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.MAIL_ACCOUNT, // sender address
            to: 'cuongg121101@gmail.com', // list of receivers
            subject: 'Bạn đã đặt hàng tại shop Vancuong77 ✔', // Subject line
            html: `<div><b>Bạn đã đặt hàng thành công tại shop Vancuong77</b></div> </br>
            <div>${listItems}</div>
            `, // html body
            attachments: attachmentsImage,
        });

        //console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
    }

    main().catch(console.error);
};

module.exports = {
    sendMailCreateOrder,
};
