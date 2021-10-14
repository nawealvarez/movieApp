const jwt = require('jsonwebtoken');
const config = require('../database/config/index');
const { User } = require('../database/models/user');
const db = require('../database/models/index');
const ServiceError = require('../util/index');
const admin = require('firebase-admin');

class TokenService {
    async generate(user) {
        const expire = new Date();
        expire.setHours(expires.getHours() + 12);

        const payload = {
            sub: user.id,
            username: user.username,
            exp: expire.getTime()
        };

        const token = jwt.sign(payload, config.jwtSecret);
        return token;
    }
}

class AuthService {
    constructor() {
        this.tokenService = new TokenService();
    }

    async extractUSer(body) {
        const { token } = body;
        if (!token) {
            throw new ServiceError(401, "Access denied");
        }
        try {
            return admin.auth().verifyIdToken(token);
        } catch (e) {
            throw new ServiceError(401,e);
        }
    }

    async signUp(body) {
        const decodedToken = await this.extractUSer(body);
        const newUser = await this.createUser(decodedToken, body);
        const token = await this.tokenService.generate(newUser);
        return { token: token};
    }

    async logIn(body) {
        const {fcmToken} = body;
        const decodedToken = await this.extractUSer(body);
        const user = await db.User.findOne({firebaseId: decodedToken.user_id});
        
        if (!user) {
            throw new ServiceError(400, {msg: "User Not Initialized"});
        }
        if (user.fcmToken != fcmToken) {
            user.fcmToken = fcmToken;
        }

        return await this.tokenService.generate(user);
    }

    async logOut(user) {
        user.fcmToken = null;
        await user.save();
    }

    async createUser(payload, body) {
        const firebaseId = payload.user_id;
        const userCheck = await db.User.findOne({
            firebaseId: firebaseId
        });
        if (userCheck) {
            throw new ServiceError(400, "User already exists");
        }
        const username = body.username;
        const fcmToken = body.fcmToken;
        const email = body.email;
        const user = await db.User.create({firebaseId: firebaseId, username: username, email: email, fcmToken: fcmToken});
        return user;
    }
}

module.exports = {
    AuthService
}