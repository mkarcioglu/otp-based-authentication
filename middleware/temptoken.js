const jwt=require('jsonwebtoken');

module.exports=(req, res, next)=>{
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token){
        // Verify token.
        jwt.verify(token, process.env.TEMPORARILYTOKENKEY,(err, decoded)=>{
            if(err){
                res.status(401).json({
                    status: false,
                    message: "Failed to authenticate token!"
                });
            }else{
                if(!decoded.email){
                    res.status(401).json({
                        status: false,
                        message: "Failed to authenticate token!"
                    });
                }else{
                    req.decoded_email=decoded.email;
                    next();
                }                
               
                
            }

        });
    }else{ 
        res.status(401).json({
            status: false,
            message: "Forbidden!"
        });
    }
};