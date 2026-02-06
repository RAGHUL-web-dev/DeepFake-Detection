const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
    {
        // identity
        email : {
            type : String,
            required : [true, "please enter the email"],
            unique : true,
            trim : true,
            lowercase : true,
            index : true
        },
        password : {
            type : String,
            required : [true, "please enter the password"],
            select : false
        },

        // profile
        name : {
            type : String,
            required : [true, "please enter the name"],
            trim : true
        },
        avatar : {
            type : String
        },
        
        
        role : {
            type : String,
            default : "user",
            enum : ["user", "admin"],
            index : true
        },

        // status
        status : {
            type : String,
            default : "active",
            enum : ["active", "inactive", "deleted"],
            index : true
        },

        // authentication 
        auth : {
            provider : {
                type : String,
                default : "local",
                enum : ["local", "google", "github"],
                index : true
            },
            
            loginCount : {
                type : Number,
                default : 0
            },

            lastLogin : {
                type : Date,
                default : Date.now
            }
        },

        // security
        security : {
            isVerified : {
                type : Boolean,
                default : false
            },

            isBlocked : {
                type : Boolean,
                default : false
            },

            failedLoginAttempts : {
                type : Number,
                default : 0
            },

            lastFailedLoginAttempt : {
                type : Date,
                default : null
            }
        },

        // timestamps
        createdAt : {
            type : Date,
            default : Date.now
        },

        updatedAt : {
            type : Date,
            default : Date.now
        }
    }
)


userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next()

    if(this.password){
        this.password = await bcrypt.hash(this.password, 10)
    }
    // next()
})
 
userSchema.methods.getJWTToken = function(){
    return JWT.sign({id : this._id}, process.env.JWT_SECRET_KEY, {expiresIn : process.env.JWT_EXPIRESIN})
}


userSchema.methods.comparePasword = function(enterPassword){
    try {
        return bcrypt.compare(enterPassword, this.password)
    } catch (error) {
        throw new Error("Invalid password")
    }
}

userSchema.index({email : 1})
userSchema.index({role : 1})
userSchema.index({status : 1})
userSchema.index({auth : 1})
userSchema.index({security : 1})
userSchema.index({createdAt : 1})
userSchema.index({updatedAt : 1})

module.exports = mongoose.model("User", userSchema)