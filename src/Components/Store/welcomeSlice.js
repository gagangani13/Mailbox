import { createSlice } from "@reduxjs/toolkit";
const welcomeInitialState={ options: "compose", inbox: null,sent:null ,count: 0 }
const welcomeSlice = createSlice({
  name: "Welcome page",
  initialState: welcomeInitialState,
  reducers: {
    setOptions(state, action) {
      state.options = action.payload;
    },
    setInbox(state, action) {
      state.inbox = action.payload;
    },
    updateCount(state, action) {
      state.count = action.payload;
    },
    setSent(state, action) {
        state.sent = action.payload;
      }
  },
});
export const welcomeAction = welcomeSlice.actions;
export const welcomeReducer = welcomeSlice.reducer;
export default welcomeSlice;

export const loadFromFirebaseThunk = (sentByEmail, option) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://mailbox-6509c-default-rtdb.firebaseio.com/${sentByEmail}/${option}.json`
    );
    const data = await response.json();
    try {
      if (response.ok) {
        if (data!==null) {
          const messages = [];
          for (const item in data) {
            messages.unshift({
              Id: item,
              message: data[item].message,
              subject: data[item].subject,
              email:
                option === "inbox"
                  ? data[item].senderEmailId
                  : data[item].receiverEmailId,
              who: option === "inbox" ? "From" : "To",
              date: data[item].date,
              unread: data[item].unread,
            });
          }
          option==='inbox'&&dispatch(welcomeAction.setInbox(messages))
          option==='sent'&&dispatch(welcomeAction.setSent(messages));
        }else{
            option==='inbox'&&dispatch(welcomeAction.setInbox(null))
            option==='sent'&&dispatch(welcomeAction.setSent(null));
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      alert(data.error);
      console.log(data);
    }
  };
};
