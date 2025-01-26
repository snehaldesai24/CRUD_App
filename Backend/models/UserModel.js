import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    id:{type:Number, require:true},
    Fname:{type:String, require:true},
    Lname:{type:String, require:true},
    email:{type:String, require:true},
    phone:{type:Number, require:true},
    password:{type:String, require:true},
    city:{type:String, require:true},
    profile:{type:String, require:true},
})

//password hash convert
UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("user", UserSchema);
export default User;