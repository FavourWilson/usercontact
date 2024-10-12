import React from 'react'
import Header from '../component/Header'
import AddUserContact from '../component/AddUserContact'
import { Link } from 'react-router-dom'
import CreateForm from '../layout/CreateForm'
import Badge from '../component/Badge'

const Home = () => {
  return (
    <div className='grid grid-cols-12 justify-between items-center gap-4 px-2'>
      <div className='col-span-6'>
        <Badge/>
      </div>
      <div className='col-span-6'>
         <CreateForm/>
      </div>
          
         
    </div>
  )
}

export default Home