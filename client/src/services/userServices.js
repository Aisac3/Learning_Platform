import { axiosInstance } from "../axios/axiosInstance"

export const listCourse=()=>{
    return axiosInstance.get('/course/listcourses')
}

export const userRegister=(data)=>{
    return axiosInstance.post('/user/register',data)
}

export const userLogin=(data)=>{
    return axiosInstance.post('/user/login',data)
}

export const userLogout=()=>{
    return axiosInstance.post('/user/logout')
}

export const addtoCart=(courseId)=>{
    return axiosInstance.post(`/cart/addtocart/${courseId}`)
}

export const getCartItems=()=>{
    return axiosInstance.get('/cart/getcart')
}

export const removeCartItem=(courseId)=>{
    return axiosInstance.delete(`/cart/removefromcart/${courseId}`)
}