import React, { useEffect } from "react";
import Mailbox from "./Mailbox";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../Store/authSlice";
import Header from "../Header";
import Inbox from "./Inbox";
// import { loadFromFirebaseThunk } from "../Store/welcomeSlice";
const WELCOME = () => {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.welcomeReducer.options);
  useEffect(() => {
    const senderEmailId = localStorage.getItem("senderEmailId");
    if (senderEmailId) {
      dispatch(authAction.loginHandler(senderEmailId));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <div
        style={{
          position: "absolute",
          color: "bisque",
          top: "10rem",
          // eslint-disable-next-line
          position: "absolute",
          width: "70vw",
          left: "15vw",
        }}
      >
        {option === "compose" && <Mailbox />}
        {option === "inbox" && <Inbox empty='No Emails received in Inbox'/>}
        {option === "sent" && <Inbox empty='No Emails are sent' />}
      </div>
    </>
  );
};

export default WELCOME;
