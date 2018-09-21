const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
})

// Define schema methods
userSchema.methods = {
  checkPassword: function(inputPassword){
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

// Define hooks for pre-saving
userSchema.pre('save', function(next){
  if(!this.password){
    console.log("models/user.js ========NO PASSWORD PROVIDED========")
    next()
  } else {
    console.log("models/user.js hashPassword in pre save");

    this.password = this.hashpassword(this.password)
    next()
  }
})

const User = module.exports = mongoose.model('User', userSchema);

module.exports = {
  createUser: function(req,res){
    console.log('user signup');

    const { username, password } = req.bodyParser
    // VALIDATION
    User
      .findOne({ username: username }, (err, user) => {
        if (err) {
          console.log('User.js post error: ', err)
        } else if (user) {
          res.json({
            error: `Sorry, already a user with the username: ${username}`
          })
        } else {
          const newUser = User({
            username: username,
            password: password
          })

          // If validation passed, then save newUser
          newUser.save((err, savedUser) => {
            if(err) return res.json(err)
            res.json(savedUser)
          })
        }
      })
  },

  passAuth: ()=>{ passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
      .then(req,res) => {
        console.log('logged in', req.user);
        var userInfo = {
          username: req.user.username
        };
        res.send(userInfo);
      }
  }
  userLogin: function(req, res, next){
    console.log("========== Login ==========")
    console.log(req.body)
    console.log("===========================")
    next()
  },

  userGet: function(req, res, next){
    console.log("========== user ===========")
    console.log(req.user)
    console.log("===========================")
    if (req.user) {
      res.json({ user: req.user })
    } else {
      res.json({ user: null})
    }
  },

  userLogout: function(req,res){
    if(req.user){
      req.logout()
      res.send({ msg: 'logging out'})
    } else {
      res.send({ msg: 'no user to logout'})
    }
  }
}
