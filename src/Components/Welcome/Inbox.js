import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import Mails from './Mails'
import NoMails from './NoMails'
const Inbox = (props) => {
    const [mails,setMails]=useState([])
    const sentByEmail=useSelector((state)=>state.authenticate.login).replace(/[@.]/g,"")
    async function loadInbox(props){
        const response=await fetch(`https://mailbox-6509c-default-rtdb.firebaseio.com/${sentByEmail}/inbox.json`)
        const data=await response.json()
        try {
            if(response.ok){
                console.log(data)
                !data&&setMails(null)
                if(data){
                    const messages=[]
                    for(const item in data){
                        messages.unshift({message:data[item].message,subject:data[item].subject,email:data[item].senderEmailId,who:'From',date:data[item].date})
                    }
                    setMails(messages)
                }
            }else{
                throw new Error()
            }
        }catch(error){
            alert(data.error.message)
        }
    }
    useEffect(()=>{
        loadInbox()
        // eslint-disable-next-line
    },[])
  return (
    <>
      <h4>INBOX</h4>
      {!mails&&<NoMails option={props.option}/>}
      {mails&&<Mails mails={mails}/>}
    </>
  )
}

export default Inbox
