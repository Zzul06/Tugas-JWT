import db from "../config/Database.js";
import User from "./userModel.js";


const syncUser=async()=>{
    try {
        await db.sync({alter:true,force:true});
        console.log("database and model synced successfully");
    } catch (error) {
        console.log(error.message);
    }
}

export{User,syncUser};