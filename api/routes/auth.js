const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require("bcrypt");

//Register

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
   // console.log(req.body);
      try {
          const salt = await bcrypt.genSalt(12)
          const hassedPassword = await bcrypt.hash(password, salt);

          const newUser = await User({
            username,
            email,
            password: hassedPassword,
          })
          const user = await newUser.save()

          res.status(200).json(user)
          
      } catch (error) {
          console.log(error);
          res.status(500).json(error)
      } 
})

//Login

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

     const { password, ...others } = user._doc;
     res.status(200).json(others);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})



module.exports = router;