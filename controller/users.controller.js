const usersModel = require('../model/users.model');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');



exports.loginSubmit = async (req)=>{
    try{

        console.log(req);

        const {email,password} = req;
        let status = 200;
        let message = "";
        let error = 1;
        let respdata='';
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        
        if(email=='' || password==''){
            status = 400;
            message = "email or password required";
        }else if(!(req.email) || !(req.password)){
            status = 400;
            message = "email or password parameters required";
        }else if(!emailRegexp.test(email)){
            status = 200;
            message = "Please enter a valid email";
        }else{ 

            const getUser = await usersModel.findOne({"email":email});  

            

            //encryptedPassword = await bcrypt.hash(password, 10);  
            if(getUser && (await bcrypt.compare(password, getUser.password) )){ 
                    const token = jwt.sign({ users_id: getUser._id, email },process.env.JWT_SECRET_KEY,{ expiresIn: "2h" });

                    let updateRecord = await usersModel.updateOne({email:email},{token:token});

                    if(updateRecord.modifiedCount){
                        status = 200;
                        message = "user find & token update :"+ email;
                        error=0;
                        respdata={
                            users_id:getUser._id,
                            token:token,
                            companyid:getUser.company_id,
                            branchid:getUser.branch_id,
                            usertype:getUser.user_type,
                            user_name:getUser.user_name,
                        };
                    }
                

                }else{
                    status = 200;
                    message = "email or password not valid";
                }            
        }     

       
        let resp = JSON.stringify({status:status,message:message,error:error,data:respdata});
        return resp;        

    }catch (err) {
        console.log(err);
      }

}