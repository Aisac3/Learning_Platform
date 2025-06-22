import React from 'react'
import { removeCartItem } from '../../services/userServices'

function CartCard({item,updateCartFromChild}) {

    const removeItem=(courseId)=>{
        try {
            removeCartItem(courseId).then((res)=>{
                console.log(res);
                updateCartFromChild(courseId,res.data.cart.totalprice)
            }).catch((error)=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="bg-gray-100 w-full shadow-xl flex items-center justify-between py-5">
  <figure>
    <img
      src={item.courseId.image}
      alt="Shoes" className='h-[100px]'/>
  </figure>
  <div className="">

    <p>PRICE:{item.price}</p>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={()=>removeItem(item.courseId._id)}>Remove</button>
    </div>
  </div>

  )
}

export default CartCard