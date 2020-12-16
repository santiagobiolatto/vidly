const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const mongoose = require('mongoose');

describe('generateAuthToken', ()=>{
    it('should return a valid jwt token',()=>{
        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true}
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.JWTSecret);
        expect(decoded).toMatchObject(payload);
    })
});