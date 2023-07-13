const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const crypto = require("crypto");

module.exports = {
    async login(req,res){
        const {email, password}=req.body
        try{
            const user = await db.User.findOne({
                where:{[db.Sequelize.Op.and]:[
                    {email:email},
                    {password:password}
                ]}
            })
        }catch(error){
            return 
        }
    }
}