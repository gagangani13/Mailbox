import { useEffect } from "react";
import { useState } from "react";

const useFetch = (sentByEmail) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function loadInbox(sentByEmail) {
      const response = await fetch(
        `https://mailbox-6509c-default-rtdb.firebaseio.com/${sentByEmail}/inbox.json`
      );
      const data = await response.json();

      try {
        if (data !== null) {
          if (response.ok) {
            let counter = 0;
            for (const item in data) {
              if (data[item].unread === "true") {
                counter = counter + 1;
              }
            }
            // dispatch(welcomeAction.updateCount(counter));
            setCount(counter);
          } else {
            throw new Error("empty");
          }
        } else {
          throw new Error("empty");
        }
      } catch (error) {
        // dispatch(welcomeAction.updateCount(0));
        alert(data.error.message);
      }
    //   clearTimeout();
    }
    setInterval(()=>loadInbox(sentByEmail),5000);
    
  }, [sentByEmail]);

  return count;
};

export default useFetch;
