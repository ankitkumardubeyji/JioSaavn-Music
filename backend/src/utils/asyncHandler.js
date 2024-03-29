const asyncHandler = (fn) => { // taking a function as the input
    
  // wrapping the fxn inside async , try catch block  
    async(req,res,next) => {
        try{
            fn(req,res,next); // executing the function
        }
        catch(err){
            res.status(err.status || 400).json({
                success:false,
                message:"sorry some error occured"
            })
        }
    }
}

