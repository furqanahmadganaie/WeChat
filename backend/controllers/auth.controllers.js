
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
	try {
		const { fullname, username, password, confirmpassword, gender } = req.body;

		if (password !== confirmpassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullname,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullname: newUser.fullname,
				username: newUser.username,
				profilePic: newUser.profilePic,
				
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);
		

		res.status(200).json({
			_id: user._id,
			fullname: user.fullname,
			username: user.username,
			profilePic: user.profilePic,
			
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
















// import bcrypt from "bcryptjs"
// import User from "../models/user.model.js";
// import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";



// //we make functions here then use in routes  innauth.routes
// export const signup = async (req, res) => {
//     try {
//         const { fullname, username, password, confirmpassword, gender } = req.body; //this will come from user and wil be saved db

//         if (password !== confirmpassword) {
//             return res.status(400).json({ error: "wrong password" })
//         }

//         const existingUser = await User.findOne({ username });

//         if (existingUser) {
//             return res.status(400).json({ error: "username already exits" })
//         }

//         // hash password because if someone stealed my data base he will acess everyone data
//         //that is why we are hashing so that we cannnot see the user password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);  //instead of salt will store password;hashpassword

//         //https://avatar-plaeholder.iran.liars.run/  //this api give palceholder avatar
//         const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
//         const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//         const newUser = new User({
//             fullname,
//             username,
//             password: hashedPassword,
//             gender,
//             profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
//         });

//         if (newUser) {

//             //save first
            
//             //generate jwt token

//              generateTokenAndSetCookie(newUser._id, res);
//             await newUser.save();
            
//             res.status(201).json({
//                 _id: newUser._id,
//                 fullname: newUser.fullname,
//                 username: newUser.username,
//                 profilePic: newUser.profilePic,
                
//             });
//         }
//         else {
//             res.status(400).json({ error: "invalid user data" })
//         }


//     } catch (error) {
//         console.log("error in signup controller", error.message);
//         res.status(500).json({ error: "internal server in signup  error" })
//     }
//     //  res.send("signup route")
//     // console.log("signup router ");
// };



// export const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         // console.log('Received Password:', password);


//         const user = await User.findOne({ username });


//         const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); //if user doesnot exits it will through error thst is why we are using  || and ?
        
        

//         if (!user || !isPasswordCorrect) {
// 			return res.status(400).json({ error: "Invalid username or password" });
// 		}
        

//          generateTokenAndSetCookie(user._id, res);
    
//         res.status(200).json({
//             _id: user._id,
//             fullname: user.fullname,
//             username: user.username,
//             profilePic: user.profilePic,
            
//         });


//     } catch (error) {
//         console.log("error in login controller", error.message);
//         res.status(500).json({ error: "internal server in login error" });
//     }
// }



// export const logout =  (req, res) => {

//   try{
//       res.cookie("jwt","",{maxAge:0});
//       res.status(200).json({message:"logged out sucessfully"})

//   } catch (error) {
//     console.log("error in logout  controller", error.message);
//     res.status(500).json({ error: "internal server error" })
//   }
// }