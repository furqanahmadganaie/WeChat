first npm vite#latest .
then npm i

now backend 
now as usual we were instlling the npm init in backebd folder now we will instaall in root because it will be east to depoloy  

install all dependencies 
 npm install express dotenv cookie-parser bcryptjs mongoose so
cket.io jsonwebtoken

inside package .json
go script and make own  nodemon 

npm run server
npm run dev









issske baid use dotenv
uske baid routes 
// we can make 

// app.get('/api/auth/signup', (req,res) =>{
//     console.log(" signup route ")
// });

// app.get('/api/auth/login', (req,res) =>{
//     console.log(" login route ")
// });
// app.get('/api/auth/logout', (req,res) =>{
//     console.log(" login route ")
// });
// app.get('/api/auth/signup', (req,res) =>{
//     console.log(" login route ")
// });
// app.get('/api/auth/signup', (req,res) =>{
//     console.log(" login route ")
// });


phir controllers
now the controllers will take data from user and save in data base using post method 
connect to db monogo db 

now  user models

models k baid token ko generate krty hai 

token is gentd by use command in bash openssl rand -base64 32  this gives secure secerit


after making all three routes 
we will make message models 
there will two types data bases 
1 conversation which stors message 

it will have 
id 90
participants :array[1,2]
message:array[90] 

2 message which hepls us innmeassages 
_id which will be genrated by mongodb
senderid
receiverid
mesage: hello .....

eg 
lets we have 2 user jon 1 joe 2
fisrt jon send message a token will genrated innmessage collection 
with sederid reciverid 
and message 


then in conversation will be made 
which contans participant array that is 1 and 2 
and meaasge id that which was genrated in message colllection 
alo we joe will thta id will aslo be stored in messages[]

now create message model and consersation model 

now chek bt signup we willget createAt 
andupdateAt we can use that in user models
and save it  later we add socket io

now add routes fo get messagesbetween 2 user

usercontroller and user routes in server.js
here ends the backed 

now frontend  
phle root min javo  git init 
.env ko gitignore mai dalo
phir git add .
git commit -m 
cd over frontend 
npm run dev
anow intsall taiwind css
 in another terminal
 now daist ui 
 go to wesite and intall and plugin tailwind.config.js 
 and from tailwind css add  tailwind directives into index .css

 lets tryin app.jsx

 now make pages login sigup home and make jsx files for them 
 es7 extension give sinnpetts rafce
 

 and 

now build login page 
now signup 
home 
npm install react-icons --save for icons

now conversation in side bar instead of putting all conversations in side bar wewill mzke separate component for them 
add conversations 
now add logout button
usske baid side wale desgin kro 
then agr conversation nhi huve uss time ksai hona chaiya 


commit changes 

connect fronted and backed 

add functionality

npm react router dom 
go majin .jsx to able to use component coming from react router dom 
we need rap over application in browser component

as routes are working add own port in viteconfijs   
server:{
    port:3000,
  }


add Link isted of a 
then addd functionalities to signup page
add values to inputs

in order to make user sign init gets very massive 
we will make hooks folder 

now when user logns it should sent him home page use context
wrap application inside this authcontext main.jsx
go to app.jsx get that auth vlue
  proxy:{
      "/api":{
        target:"http://localhost:3000",
      }
    }


now add login fuctionality create for it
now ligin logout is ready 
noe fatch the users in sidebar
npm zustand
create hook to fetch these conversations 

for sent messages create hook  usesentmesages  
coll this inise message input component 
usegetmesages hook 



now socket io it server real tome we have create server when user sends messages to it will bestored in db and sended to another user 

in backend socket.js and use in sever.js and in frontend

(inside context ) 
instal socket.io-client in frontend 



after socket we have to deploy it 
to deploy we have make some changes in backend

go to github and create repo

 git init

urqan Ahmad Ganai@LAPTOP-JL15TTB7 MINGW64 ~/OneDrive/WeChat/backend (main)
$ git add .

Furqan Ahmad Ganai@LAPTOP-JL15TTB7 MINGW64 ~/OneDrive/WeChat/backend (main)
$ git commit -m "first commit"









.1 Install Required Packages
First, ensure you have the necessary packages installed in your backend application:

bash
Copy code
npm install jsonwebtoken dotenv express
jsonwebtoken: For creating and verifying JWTs.
dotenv: For managing environment variables.
1.2 Generate JWT on User Login
In your backend login route, generate a JWT and send it back to the client upon successful authentication.

Example: authController.js

javascript
Copy code
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Function to generate JWT and set it in a cookie
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Prevent XSS attacks
    sameSite: 'strict', // Prevent CSRF attacks
    secure: process.env.NODE_ENV === 'production', // Set to true in production
  });
};

// Login route
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  
  // Validate user credentials
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate token and set it in a cookie
  generateTokenAndSetCookie(user._id, res);

  // Send response
  res.json({ message: 'Login successful', user });
};

export { loginUser };
1.3 Protect Routes with Middleware
Create middleware to protect routes that require authentication.

Example: protectRoute.js

javascript
Copy code
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in protectRoute middleware:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default protectRoute;
2. Frontend Setup
2.1 Handle JWT in the Frontend
When a user logs in, store the JWT received from the backend in localStorage or cookies, and use it for authenticated requests.

Example: useLogin.js

javascript
Copy code
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Store token in localStorage
      localStorage.setItem('chat-user', JSON.stringify(data.token));
      setAuthUser(data.user);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
2.2 Include Token in Requests
Include the JWT in the Authorization header for authenticated requests.

Example: useGetConversations.js

javascript
Copy code
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('chat-user');
        if (!token) {
          throw new Error('No token found, please log in.');
        }

        const res = await fetch('http://localhost:3000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
3. Final Testing and Debugging
3.1 Test Authentication Flow
Sign Up: Ensure that new users can sign up and that tokens are correctly generated and stored.
Login: Verify that users can log in and that tokens are stored and retrieved properly.
Protected Routes: Test accessing protected routes to confirm that only authenticated users can access them.
3.2 Debugging
Check Token Storage: Use browser developer tools to ensure that tokens are correctly stored and retrieved from localStorage.
Inspect Headers: Verify that Authorization headers are correctly included in requests.
Monitor Backend Logs: Check server logs to ensure that tokens are properly validated and decoded.
By following these steps, you should have a robust authentication system in place using JWTs. If you encounter specific issues, debugging with detailed logs and testing each component thoroughly will help in resolving them.









 








