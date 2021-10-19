const jwt = require('jsonwebtoken');
const config = require('../database/config/index');
const db = require('../database/models/index');
var ServiceError = require('../util/index').ServiceError;
const admin = require('firebase-admin');

class TokenService {
    async generate(user) {
        const expires = new Date();
        expires.setHours(expires.getHours() + 12);

        const payload = {
            sub: user.id,
            username: user.username,
            exp: expires.getTime()
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

    /**
     * @param {Object} body
     * @param {string} body.username
     */
    async signUp(body) {
        const decodedToken = await this.extractUSer(body);
        const newUser = await this.createUser(decodedToken, body);
        const token = await this.tokenService.generate(newUser);

        return { token: token};
    }

    async logIn(body) {
        const decodedToken = await this.extractUSer(body);
        const user = await db.User.findOne({
            where: {firebaseId: decodedToken.user_id},
        });
        
        if (body.credential !== null && !user) {
            const newUser = await this.createUser(decodedToken, body);
            const token = await this.tokenService.generate(newUser);

            return { token: token};

        }

        if (!user) {
            throw new ServiceError(400, {msg: "User Not Initialized"});
        }
        return await this.tokenService.generate(user);
    
    }
    
    /**
     * 
     * @param {Object} payload 
     * @param {string} payload.uid
     * @param {string} payload.email
     * @param {Object} body
     * @param {string} body.username 
     */
    async createUser(payload, body) {
        const firebaseId = payload.user_id;
        const userCheck = await db.User.findOne({
            where: {firebaseId: firebaseId},
        });
        if (userCheck) {
            const error = new ServiceError(400, "User already exists");
            console.log(400, "User already exists", error);
            throw error;
        }
        const email = body.email;
        const user = await db.User.create({'firebaseId': firebaseId, 'email': email});
        return user;
    }
}

module.exports = {
    AuthService
}