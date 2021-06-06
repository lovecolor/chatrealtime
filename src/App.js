import logo from "./logo.svg";
import "./App.scss";
import $ from "jquery";
import MessageItem from "./components/message-item/MessageItem";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { add } from "./reducers/chatSlice";
import { configureStore } from "@reduxjs/toolkit";

let socket = null;

function App() {
  const dispatch = useDispatch();

  const listMess = useSelector((state) => state.listMess);

  const [user, setUser] = useState(null);
  const [messIp, setMessIp] = useState("");
  useEffect(() => {
    socket = io("localhost:6969");

    socket.on("id", (res) => setUser(res)); // lắng nghe event có tên 'id'

    socket.on("newMessage", (response) => {
      dispatch(add(response));

      const objDiv = document.getElementById("mess");
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }, []);

  const sendnewMessage = () => {
    if (messIp) {
      socket.emit("newMessage", messIp); //gửi event về server
      setMessIp("");
    }
  };

  const checkEnter = (e) => {
    if (e.keyCode === 13) {
      sendnewMessage();
    }
  };
  const onChangeMessIp = (e) => {
    setMessIp(e.target.value);
  };
  return (
    <div className="App">
      <div className="mess-list" id="mess">
        
        {listMess.map((item, index) => {
          return (
            <MessageItem
              key={index}
              isLeft={!(user === item.id)}
              mess={item.data}
            ></MessageItem>
          );
        })}
      </div>
      <div className="form">
        <input
          autoFocus
          onKeyUp={checkEnter}
          onChange={onChangeMessIp}
          value={messIp}
          className="form__ip"
          type="text"
          placeholder="send message"
          required
        ></input>
        <div onClick={sendnewMessage} className="form__btn-send">
          Send
        </div>
      </div>
    </div>
  );
}

export default App;
