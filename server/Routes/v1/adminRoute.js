const { adminRegister, adminLogin, adminLogout } = require('../../Controllers/adminController')

const adminRouter=require('express').Router()


adminRouter.post('/register',adminRegister,)
adminRouter.post('/login',adminLogin),
adminRouter.post('/logout',adminLogout)

module.exports=adminRouter