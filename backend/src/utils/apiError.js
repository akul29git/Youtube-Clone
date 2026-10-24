class ApiError extends Error {
    constructor(
        statusCode,
        message,
        error=[]
    ){
        super(message)
        this.statusCode=statusCode
        this.error=error
        this.message=message
        this.success=false
        this.data=null
    }
    tojson(){
        return {
            success:this.success,
            message:this.message,
            data:this.data,
            statusCode:this.statusCode,
            error:this.error
        }
    }
}

export default ApiError

// there are a lot of edge cases to handle in error handling, so we will create a custom error class to handle all 
// the errors in a consistent way. This class will be used to create error objects that can be thrown and caught in the 
// application. The error objects will have a status code, message, and an optional array of errors. The tojson method 
// will be used to convert the error object to a JSON object that can be sent as a response to the client.