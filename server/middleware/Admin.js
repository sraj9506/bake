import AdminModel from "../models/Admin.model.js"

export const admin = async(request,response,next)=>{
    try {
       const  userId = request.userId

       const user = await AdminModel.findById(userId)

       if(user.role !== 'Admin'){
            return response.status(400).json({
                message : "Permission denial No admin access",
                error : true,
                success : false
            })
       }

       next()

    } catch (error) {
        return response.status(500).json({
            message : "Permission denial catch",
            error : true,
            success : false
        })
    }
}