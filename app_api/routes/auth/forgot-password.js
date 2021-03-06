const Router = require ("express").Router;
const User = require ("../../models/User");
const Token = require ("../../models/Token");
const crypto = require("crypto");
const {smtptransporter} = require("../../helpers/mailsHandler");


const router = Router({
    mergeParams:true
}) 


router.post ('/forgot-password',async (req,res) => {
const userExist = await User.findOne ({email : req.body.email});


if (!userExist) {
return res.status(400).send(
    {message : "Email does not exist !"})
}


const token = new Token({
    _userId: userExist._id,
    token: crypto.randomBytes(32).toString("hex"),
    tokenType: "resetPassword"
  });

confirmationEmail = `http://localhost:4200/enter-password/` + token.token;

smtptransporter.sendMail(
    {
        "to" : userExist.email,
        "subject": 'Reset your password',
        "html": `Click on this link to reset your account's password <a href="${confirmationEmail}">${confirmationEmail}</a>`,
    auth : {
        user : process.env.USER,
        accessToken : process.env.ACCESS_TOKEN,
        refreshToken :process.env.REFRESH_TOKEN
    }},
)
try{
  await token.save();
  res.status(200).send(
    {
      message : "email sent"
    }
  )
}
catch(error){
return res.status(500).send({
  error :error
}
)
}
})


module.exports = router;
