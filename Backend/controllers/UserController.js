import User from "../models/UserModel.js";

//add user
export const addUser = async (req, res) =>{
    const {id, Fname, Lname, email, phone, password, city} = req.body;
    try{
        const newUser = new User({
            id, 
            Fname, 
            Lname, 
            email, 
            phone, 
            password, 
            city,
            profile:req.file ? req.file.filename : null,
        })
        await newUser.save();
        res.status(200).json({ message:"User Added!!" });
    } catch (err) {
        console.error(err); // Log error details
        res.status(500).json({ error: "Failed To Add User", details: err.message });
    }
    
}


//get user
export const getUser = async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

//edit user
export const editUser = async(req,res)=>{
    const {id} = req.params;
    const {Fname, Lname, email, phone, password, city} = req.body;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error:"User Not Found"});
        }
        user.Fname = Fname || user.Fname;
        user.Lname = Lname || user.Lname;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.city = city || user.city;
        user.password = password || user.password;
        if(req.file){
            user.profile = req.file.filename;
        }
        await user.save();
        res.status(200).json({message:"User Data Updated!!"});
       
    }catch (err) {
        console.error(err); // Log error details
        res.status(500).json({ error: "Failed To Add User", details: err.message });
    }
}

//delete user
export const deleteUser = async (req, res)=>{
    const {id} = req.params;
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({error:"User Not Found!!"});
        }
        res.status(200).json({message:"User Deleted!!"});
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

//user get by Id
export const getUserById = async (req, res)=>{
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error:"User Not Found!!"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error: err.message})
    }
}