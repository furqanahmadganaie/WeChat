import jwt from 'jsonwebtoken'

const generateToken = (userId,res) =>{

  const token= jwt.sign({userId}, process.env.JWT_SECRET,{
    expiresIn:'15d',
  });
//set an cookie
  // res.cookie('jwt',token,{
  //   maxAge:15 * 24 * 60 * 60 *1000,
  //   httpOnly:true,                  //prevent from xss attacks  crosss site scripting attacks 
  //   sameSite:"strict" ,               //prevents csrf attacks 
  //   secure: process.env.NODE_ENV !=="development"
  // });
  // console.log('Generated Token:', token);

  return token;
   
};
  // coll this function in controllers
export default generateToken