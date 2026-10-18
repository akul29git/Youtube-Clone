const asyncHandler=(requestHandler)=> {
    return (req,res,next)=>{
        Promise
         .resolve(requestHandler(req,res,next))
         .catch((error)=>{
            res.status(error.status || 500).json({
                status:false,
                message:error.message
            })
            next(error)
        })
    }
}


export {asyncHandler}