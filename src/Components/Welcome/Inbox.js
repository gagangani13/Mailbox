import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Mails from './Mails'
import { loadFromFirebaseThunk } from '../Store/welcomeSlice'
const Inbox = (props) => {
    const dispatch=useDispatch()
    const inboxMails=useSelector((state)=>state.welcomeReducer.inbox)
    const sentMails=useSelector((state)=>state.welcomeReducer.sent)
    const sentByEmail=localStorage.getItem('senderEmailId').replace(/[@.]/g,"")
    const option=useSelector((state)=>state.welcomeReducer.options)
    const mails=(option==='inbox')?inboxMails:sentMails
    useEffect(()=>{
        dispatch(loadFromFirebaseThunk(sentByEmail,option))
    },[option,dispatch,sentByEmail])
  return (
    <>
      <h4>{option==='inbox'?'INBOX':'SENT'}</h4>
      {<Mails mails={mails} empty={props.empty}/>}
    </>
  )
}

export default Inbox
