export const errorMid= (err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message ||"sever error";
    const extraDetails=err.required_error ||"sever not responed";

    return res.status(status).json({message,extraDetails});
}