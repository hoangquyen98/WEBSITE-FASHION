var nodemailer =  require('nodemailer')
const Order = require("../models/order");

exports.orderConfirm = async (req, res, next)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hailyna93@gmail.com', // must be Gmail
      pass: '123456'
    }
  });

  var mailOptions = {
    from: 'hailyna93@gmail.com',
    to: `${req.body.email}`, // must be Gmail
    subject: 'Xác Nhận Đơn Hàng Shop Bee.Q.T',
    html: `
        <div style="background-color:#f4f4f2;padding:30px">
        <div
          style="width:380px;margin:30px auto;background-color:#fff;padding:20px;border-radius: 10px;box-shadow: 20px 10px 10px 0px rgba(153, 153, 153, 1);">
          <h3>Xác nhận đơn hàng Shop Bee.Q.T.</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <p>Cám ơn bạn đã đặt hàng của Bee.Q.T!</p>
                  <p>
                    Click vào
                    <a href="http://localhost:4200/home">link xác nhận</a> đơn hàng này !
                  </p>
                  <p>Chân Thành Cảm Ơn !</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        message: 'successfuly sent!'
      })
    }
  });

}

exports.createOrder = (req, res, next) => {
  const order = new Order({
    date: req.body.date,
    product: req.body.product,
    creator: req.body.creator,
    state: false
  });
  order
    .save()
    .then(createdOrder => {
      res.status(201).json({
        message: "Order added successfully",
        order: {
          ...createdOrder,
          id: createdOrder._id
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Creating a order failed!"
      });
    });
};
