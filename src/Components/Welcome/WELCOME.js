import React, { useEffect } from 'react'
import Mailbox from './Mailbox'
import { useDispatch,useSelector } from 'react-redux'
import { authAction } from '../Store/authSlice'
import Header from '../Header'
const WELCOME = () => {
  const dispatch=useDispatch()
  const option=useSelector((state)=>state.welcomeReducer.options)
  useEffect(()=>{
    const sentByEmail=localStorage.getItem('sentByEmail')
    if(sentByEmail){
      dispatch(authAction.setSentByEmail(sentByEmail))
    }
     // eslint-disable-next-line 
  },[])
  return (
    <>
    <Header/>
    <div  style={{position:'absolute',color:'bisque'}}>
      {option==='compose'&&<Mailbox/>}
    </div>
    </>
  )
}

export default WELCOME
