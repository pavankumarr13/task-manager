// import express from "express";
const express = require('express');
const {registerPost,registerGet,loginPost,loginGet,getLocalStorage,validateToken} = require('../controllers/authController');
// import {
//   registerGet,
//   registerPost,
//   loginGet,
//   loginPost,
//   getLocalStorage,
//   validateToken,
// } from "../controllers/authController.js";

const router = express();

// router.get('/register', registerGet);

// router.get('/login', loginGet);

router.post("/register", registerPost);

router.post("/login", loginPost);

router.post("/validate-token", validateToken);

// router.get('/getFromLocalStorage', getLocalStorage);

// export default router;
module.exports = router;