class ApiResponse {
    constructor(
        message,
        data=null,
        success=true,
        statusCode=200
    ){
        if(!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 399){
            throw new RangeError(`Invalid status code: ${statusCode}. Status code must be an integer between 100 and 399.`)
        }

        this.statusCode=statusCode
        this.message=message
        this.success=success
        this.data=data
    }

    static ok(message="success",data=null){
        return new ApiResponse(message,data,true,200)
    }

    static created(message="created successfully",data=null){
        return new ApiResponse(message,data,true,201)
    }

    tojson(){
        return {
            success:this.success,
            message:this.message,
            data:this.data,
            statusCode:this.statusCode
        }
    }
}

export default ApiResponse

// This class is used to create a consistent API response format for the application. It has a constructor 
// that takes in a message, data, success status, and status code. The class also has static methods for creating 
// common responses like "ok" and "created". The tojson method is used to convert the response object to a JSON object 
// that can be sent as a response to the client.
//also there some edge casee left to handle in this code
