import React from 'react'
import Header from '../component/Header'
import GetUserContract from '../component/GetUserContract'
import { Link } from 'react-router-dom'

const UserList = () => {
  return (
      <div>
        <Link to='/' className='bg-[#FFE500] text-[#000] py-2 px-4 cursor-pointer'>Return Back</Link>

      <div className='w-full flex justify-center items-center'>
          <GetUserContract/>
      </div>
    </div>
  )
}

export default UserList