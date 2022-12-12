
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = (req,res,next)=>
{
    const token = req.headers?.authorization?.split(' ')[1]
    if(token){
        const decoded = jwt.verify(token, process.env.SecretKey )
        if(decoded)
        {
            const userID= decoded.userID
            req.body.userID = userID
            next()

        }
        else{
            res.send('Please login')
        }

    }else{
        res.send({"msg":"please login "})
    }
}



module.exports = {authenticate}