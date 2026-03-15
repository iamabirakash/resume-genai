// For Authentication

const express = require('express')
const authController = require("../controllers/auth.controller")
const authMiddleWare = require("../middlewares/auth.middleware")

const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add rhe token in blacklist
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get durrent logged in user details
 * @access Private
 */
authRouter.get("/get-me", authMiddleWare.authUser, authController.getMeControlller)

module.exports = authRouter