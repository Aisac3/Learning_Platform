import React, { useEffect, useState } from 'react'
import CartCard from '../../components/user/CartCard'
import { getCartItems } from '../../services/userServices'
import { useNavigate } from 'react-router'

const CartPage = () => {

    const [cartItems,setCartItems]=useState([])
    const [total,setTotal] =useState([])
const navigate = useNavigate()
    const updateCartFromChild=(id,totalprice)=>{
        console.log(id,totalprice,"data from child")
        setCartItems((prev)=>prev.filter(item=> item.courseId._id!=id))
        setTotal(totalprice)
    }

    function EmptyCart(){
        return(
            <div className='flex justify-center items-center flex-col h-screen'>
                <p>The Cart is Empty</p>
                <button className='btn bg-blue-700 text-white' onClick={()=>navigate('/courses')}>Add courses</button>
            </div>
        )
    }

    useEffect(()=>{
        getCartItems().then((res)=>{
            console.log(res.data.courses)
            setCartItems(res.data.courses)
            setTotal(res.data.totalprice)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    
  return (
    <>
      {
        cartItems.length?<>
        {cartItems.map((item)=>(<CartCard key={item._id} item={item} updateCartFromChild={updateCartFromChild}/>))
            
        }
      <div className='text-right mt-5'>
        <p>TOTAL PRICE: {total}</p>
        <button className='btn bg-green-700 text-white'>Check out</button>
      </div>  
        </>:
        <EmptyCart/>
      }
    </>
  )
}

export default CartPage