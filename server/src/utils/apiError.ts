export class ApiError extends Error{
    statusCode:number;
    details?:any;

    constructor(statusCOde:number, message:string,details?:any){
        super(message);
        this.statusCode = statusCOde;
        this.message = message;
        this.details = details;
        Error.captureStackTrace(this,this.constructor);
    }
}