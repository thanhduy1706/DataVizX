const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const dotenv = require("dotenv");
require("dotenv").config({path:"./backend/.env"})

module.exports = {
    // sign access token to each user
    signAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: 30,
                issuer: "DataVizX Team",
                audience: userID,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken: (req, res, next) => {
        const token = req.body.access_token;
        console.log(token)
        if (token) {
            JWT.verify(token, "secret", (err) => {
                res.json({status:"true"})
            });
        } else {
            res.json({status:"false"})
        }
    },

    signRefreshToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1d",
                issuer: "DataVizX Team",
                audience: userID,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, payload) => {
                    if (err) return reject(createError.Unauthorized());
                    const userID = payload.aud;
                    resolve(userID);
                }
            );
        });
    },
};
