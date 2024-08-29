import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId,res) =>{
  const token= jwt.sign({userId}, process.env.JWT_SECRET,{
    expiresIn:'15d',
  })
//set n cookie
  res.cookie('jwt',token,{
    maxAge:15 * 24 * 60 * 60 *1000,
    httpOnly:true,                  //prevent from xss attacks  crosss site scripting attacks 
    sameSite:"strict" ,               //prevents csrf attacks 
    secure: process.env.NODE_ENV !=="development"
  });
  // return token;
};
  // coll this function in controllers
export default generateTokenAndSetCookie