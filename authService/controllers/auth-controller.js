const mongoose = require('mongoose');
const User = require('../models/auth-model');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const axios = require('axios');
// rest of your code

const { AddUser } = require('../apis/user-apis');

getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error){
        res.statusCode = 500;
        res.send({ message: error });
    }
}


healthCheck = (req, res) => {
    res.status(200).json({
        StatusCode: 200,
        message: 'User Service is up and running'
    });
}

getIDbyToken = async (req, res) => {
    try {
        const { token } = req.params;
        
        // Query the database to find the user by token
        const user = await User.findOne({ token: token });
      
        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return the user ID
        res.status(200).json({ userID: user._id });

    } catch (error) {
        // Handle errors
        console.error("Error retrieving user ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



// Inside the addAuthentication function
const addAuthentication = async ({ username, password, token }) => {
    try {
        if (!username || !password || !token) {
            throw new Error("Missing required fields");
        }
        const User = require('../models/auth-model');

        await User.create({ username, password, token });
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};


register = async (req, res) => {
    try {
        // 1- VALIDATION REQUEST
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF USERNAME EXISTS
        const users = await User.find({username: req.body.username});
        if (users.length > 0) {
          return res.status(400).json({
            errors: [
              {
                msg: "User already exists",
              },
            ],
          });
        }
  
      // 3- PREPARE OBJECT USER TO -> SAVE
      const userData = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        address: req.body.address,
        phone: req.body.phone,
        token: crypto.randomBytes(16).toString("hex"), // JSON WEB TOKEN, CRYPTO -> RANDOM ENCRYPTION STANDARD
      };
      
    // 4- INSERT USER INTO AUTH DB
    await addAuthentication(userData);

    // 5- INSERT USER OBJECT INTO USER DB
    try {
        const userReturns = await AddUser(userData); // Call Kiro's addUser API
    } catch (error) {    
        console.error("Error adding user via API:", error);
    }
        res.status(200).json({ message:"User Added " , user: userReturns })
        
      } catch (err) {
        res.status(500).json({ err: err });
      }
    }


login = async (req, res) => {
    try {
      // 1- VALIDATION REQUEST
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF USERNAME EXISTS
      const user = await User.findOne({username: req.body.username});
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User not found",
            },
          ],
        });
      }
      
      // 3- COMPARE HASHED PASSWORD  
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
      )
      if (checkPassword) {
        // delete user.password;
        res.status(200).json({ message: "Login successful", token: user.token });
      }
      else{
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid password",
            },
          ],
        });
      }
    } catch (err) {
      res.status(500).json({ err: err });
    }
  }


module.exports = {getAllUsers
                , healthCheck
                , login
                , getIDbyToken
                , register};


//  TODO: Token --> ID or Username