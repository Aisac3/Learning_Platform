import React, { useEffect, useState } from 'react'
import Card from '../../components/user/Card'
import { listCourse } from '../../services/userServices';


const Courses = () => {
    const [courses,setCourses]=useState([])
    useEffect(()=>{
        listCourse().then((res)=>{
            console.log(res)
            setCourses(res.data)
        }).catch((err)=> console.log(err))
    },[])

    
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {
            courses&&courses.map((course,index)=>(
                <Card key={index} course={course}/>
            ))
        }
      



    </div>
  )
}

export default Courses
