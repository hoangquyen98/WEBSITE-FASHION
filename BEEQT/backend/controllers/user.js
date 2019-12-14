const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var nodemailer =  require('nodemailer')
const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      userName:req.body.userName,
      phoneNumber: req.body.phoneNumber,
      isAdmin: req.body.isAdmin,
      avatar: req.body.avatar,
      createdOn: req.body.createdOn,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address1:req.body.address1,
      address2: req.body.address2,
      country: req.body.country,
      state: req.body.state,
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}
exports.updateUser= (req, res, next) => {
  // let imagePath = req.body.imagePath;
  // if (req.file) {
  //   const url = req.protocol + "://" + req.get("host");
  //   imagePath = url + "/images/users/" + req.file.filename;
  // }
  const user = new User({
    _id: req.body.id,
    email: req.body.email,
    userName:req.body.userName,
    phoneNumber: req.body.phoneNumber,
    isAdmin: req.body.isAdmin,
    avatar: req.body.avatar,
    createdOn: req.body.createdOn,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address1:req.body.address1,
    address2: req.body.address2,
    country: req.body.country,
    state: req.body.state,
  });
  User.updateOne({ _id: req.params.id}, user)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Couldn't udpate user!"
      });
    });
};
exports.updateAccount= (req, res, next) => {
  let avatarPath = req.body.avatar;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    avatarPath = url + "/images/avatars/" + req.file.filename;
  }
  const user = new User({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    avatar: avatarPath,
    address1:req.body.address1,
    country: req.body.country,
    state: req.body.state
  });
  User.updateOne({ _id: req.params.id}, user)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Couldn't udpate user!"
      });
    });
};

exports.getUsers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  userQuery
    .then(documents => {
      fetchedUsers = documents;
      return User.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: fetchedUsers,
        maxUsers: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching users failed!"
      });
    });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user failed!"
      });
    });
};
exports.getUserDetails = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user failed!"
      });
    });
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting users failed!"
      });
    });
};
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: 30 }
      );
      res.status(200).json({
        token: token,
        expiresIn: 30,
        userId: fetchedUser._id,
        isAdmin:fetchedUser.isAdmin
      });
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}
exports.loginbyfacebook = async (req, res, next) => {
  try{
    var today = new Date();
    const Email = req.body.email;
    const UserName = req.body.username;
    const FirstName = req.body.firstName;
    const LastName = req.body.lastName;
    const Avatar = req.body.avatar;
    const IsAdmin = false;
    const CreatedOn = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    let user = await User.findOne({email: Email})
    if(!user){
        user = new User({
          email: Email,
          userName: UserName,
          phoneNumber: '',
          isAdmin: IsAdmin,
          avatar: Avatar,
          createdOn: CreatedOn,
          firstName: FirstName,
          lastName: LastName,
          address1: '',
          address2: '',
          country: '',
          state: ''
        })
        const newuser = await user.save()
        const token = jwt.sign(
          {
            email: newuser.email,
            userId: newuser._id.toString(),
          },
          process.env.JWT_KEY,
         { expiresIn: "1000s" }
        );
        res.status(200).json({ token: token, email: newuser.email, userId: newuser._id.toString()});
    }
    else{
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
        },
        process.env.JWT_KEY,
        { expiresIn: "1000s" }
      )
      res.status(200).json({ token: token, email: user.email, userId: user._id.toString() });
    }
  }
  catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500
      }
      res.status(500).json(error)
      next(error)
  }
}

exports.loginbygoogle = async (req, res, next) => {
  try{
      var today = new Date();
      const Email = req.body.email;
      const UserName = req.body.username;
      const FirstName = req.body.firstName;
      const LastName = req.body.lastName;
      const Avatar = req.body.avatar;
      const IsAdmin = false;
      const CreatedOn = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
      let user = await User.findOne({email: Email})
      if(!user){
          user = new User({
            email: Email,
            userName: UserName,
            phoneNumber: '',
            isAdmin: IsAdmin,
            avatar: Avatar,
            createdOn: CreatedOn,
            firstName: FirstName,
            lastName: LastName,
            address1: '',
            address2: '',
            country: '',
            state: ''
          })
          const newuser = await user.save()
          const token = jwt.sign(
            {
              email: newuser.email,
              userId: newuser._id.toString(),
            },
            'somesupersecretsecret'
          );
          res.status(200).json({ token: token, email: newuser.email, userId: newuser._id.toString()});
      }
      else{
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString(),
          },
          "somesupersecretsecret"
      )

      res.status(200).json({ token: token, email: user.email, userId: user._id.toString() });
      }


  }
  catch (error) {
      if (!error.statusCode) {
          error.statusCode = 500
      }
      res.status(500).json(error)
      next(error)
  }
}
exports.paswordConfirm = async (req, res, next)=>{
  console.log(req.body.email);
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
    subject: 'Xác Nhận Đăng Ký Account Shop Bee.Q.T',
    html: `
        <div style="background-color:#f4f4f2;padding:30px">
        <div
          style="width:380px;margin:30px auto;background-color:#fff;padding:20px;border-radius: 10px;box-shadow: 20px 10px 10px 0px rgba(153, 153, 153, 1);">
          <h3>Xác nhận email đăng ký.</h3>
          <table>
            <tbody>
              <tr>
                <td>
                  <p>Cám ơn bạn đã đăng ký thành viên của Bee.Q.T!</p>
                  <p>
                    Click vào
                    <a href="http://localhost:4200/home">link xác nhận</a> để bắt đầu sử dụng dịch vụ!
                  </p>
                  <p>Trân trọng!</p>
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
