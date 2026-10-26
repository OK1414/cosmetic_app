import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
const SECRET_KEY = "helloitsapurvaandthisisour@2prokject";



export const getUsers = async (req, res) => {
    try {

        const users = await User.find({role: "user"});

        res.json({
            is_successful: true,
            data: users
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            is_successful: false,
            data: [],
            message: error.message
        });
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        is_successful: false,
        message: "Invalid Data"
      });
    }
    const user = await User.findOne({ email: email });

   if (user.password !== password) {
    return res.status(401).json({
        is_successful: false,
        message: "Invalid Data"
    });
}


    const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email,
                role : user.role 
            },
            SECRET_KEY
        );
        
      
return res.json({
    is_successful: true,
    token: token,
    user: {
        name: user.name,
        email: user.email,
        role: user.role
    }
});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      is_successful: false,
      message: error.message
    });
  }
};


export const signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message : "User created successfully",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};




export const profile = async (req, res) => {

    try {

        res.json({
            message: "Welcome",
            user: req.user
        });

    } catch (error) {

        res.status(500).json({
            message: "Error",
            error: error.message
        });

    }
};