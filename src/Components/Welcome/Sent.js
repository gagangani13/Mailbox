import React,{useEffect, useState} from 'react'
import Mails from './Mails'
import NoMails from './NoMails'
import { useSelector } from 'react-redux'
const Sent = (props) => {
    const [mails,setMails]=useState([])
    const sentByEmail=useSelector((state)=>state.authenticate.login).replace(/[@.]/g,"")
    async function loadSent(props){
        const response=await fetch(`https://mailbox-6509c-default-rtdb.firebaseio.com/${sentByEmail}/sent.json`)
        const data=await response.json()
        try {
            if(response.ok){
                console.log(data)
                !data&&setMails(null)
                if(data){
                    const messages=[]
                    for(const item in data){
                        messages.unshift({message:data[item].message,subject:data[item].subject,email:data[item].receiverEmailId,who:'To',date:data[item].date})
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
        loadSent()
        // eslint-disable-next-line
    },[])
  return (
    <>
      <h4>SENT</h4>
      {!mails&&<NoMails option={props.option}/>}
      {mails&&<Mails mails={mails}/>}
    </>
  )
}

export default Sent
