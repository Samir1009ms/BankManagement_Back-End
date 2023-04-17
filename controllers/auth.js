// user modelden import
const User = require('../models/auth');

// passwordun hashlenmesi ucun
const bcrypt = require('bcryptjs');

// token ucun
const jwt = require('jsonwebtoken');

// register
const register = async (req, res) => {
    try {
        // ! reqiest bodyden gelen data
        const { email, password, name,isAdmin } = req.body;

        // ! emailin var olub olmadigini yoxlayir
         const  user = await User.findOne({ email });

        // ! qeydiyyatdan kecmis email varsa error qaytarir
        if (user) {

            return res.status(500).json({ message: 'User already exists' })
        }
         
        // ! passwordun uzunlugunu yoxlayir
        if(password.length < 6){
            return res.status(500).json({ message: 'Password must be at least 6 characters' })
        }

        // ! passwordu hash edir
        const hashPassword = await bcrypt.hash(password, 12)

        // ! yeni user yaratir
        const newUser = await User.create ({ name, email, password: hashPassword,isAdmin });

        // ! token yaratir
        const userToken = await jwt.sign({id: newUser._id,isAdmin:newUser.isAdmin }, process.env.JWT_SECRET, {expiresIn: '1h'})

        // ! tokeni ve useri qaytarir
        res.status(200).json({
            status:"ok",
            newUser,
            userToken
        })
    }

    catch (err) {

        //  error
        res.status(505).json({ message: err.message })
    }

}

const login = async (req, res) => {
    try {

        // ! reqiest bodyden gelen data
         const { email, password } = req.body;

        // ! emailin var olub olmadigini yoxlayir
        const user = await User.findOne({email})

        // ! email yoxdursa error qaytarir
        if(!user) {
            return res.status(500).json({message: 'User does not exist'})
        }

        // ! passwordun dogrulugunu yoxlayir
        const passwords = await bcrypt.compare(password, user.password)

        // ! password yoxdursa error qaytarir
        if(!passwords) {
            return res.status(500).json({message: 'Password is incorrect'})
        }

        // ! token yaratir
        const userToken = await jwt.sign(
            {id: user._id ,isAdmin:user.isAdmin}, process.env.JWT_SECRET, 
            {expiresIn: '1h'}  )

            res.send(userToken)


        // ! tokeni ve useri qaytarir
        res.status(200).json({
            status:"ok",
            user,
            userToken
        })

    }catch (error) {
        res.status(500).json({ message: error.message })
    }


}

const user = async (req,res)=>{
    const user = await User.find()
    res.send(user)

}






// register login export elemek
module.exports = {
    register,
    login,
    user
}