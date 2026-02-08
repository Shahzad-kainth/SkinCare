const validator=require('validator');

const validate=async function(data){
   const mandateryFields=['emailId','password'];
   const isAllowed=mandateryFields.every((k)=>Object.keys(data).includes(k))
   if(!isAllowed){
    throw new Error("Fields Are Missing")
   }
  if(!validator.isEmail(data.emailId)){
    throw new Error("Invalid Email format")
  }
    if (!validator.isStrongPassword(data.password)) {
     throw new Error( "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
  }
 
}
module.exports=validate;