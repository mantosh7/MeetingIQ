export const validate = (schema) =>(req, res, next)=>{
    try{
        req.body = schema.parse(req.body) ;
        next() ;
    } catch(error){
        error.statusCode = 400;
        error.message = error.issues?.[0]?.message || "Validation error";
        next(error); // sending to global handler
    }
}