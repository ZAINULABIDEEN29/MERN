import type { Request,Response,NextFunction } from "express";
import { z, ZodError } from "zod";


export const validate = (schema: z.ZodType<any>)=>(req:Request, res:Response,next:NextFunction)=>{
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message:"Validation Failed",
                errors: error.issues.map((err: z.ZodIssue) => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }
        return res.status(400).json({
            success: false,
            message:"Validation Failed",
            error: error
        });
    }
}

export const todoValidate = (schema: z.ZodType<any>) => (req:Request,res:Response,next:NextFunction)=>{
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message:"Validation Failed",
                errors: error.issues.map((err: z.ZodIssue) => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }
        return res.status(400).json({
            success: false,
            message:"Validation Failed",
            error: error
        });
    }
}