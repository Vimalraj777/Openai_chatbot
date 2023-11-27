import React, { useState,useEffect } from 'react';
import './Chat.css';
import axios from 'axios'
import Send from '../Assets/Images/send.png'
import Loading_gif from '../Assets/Images/loading.gif'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const botdiv = document.getElementById('botbody');

  
  useEffect(() => {
    console.log("botdiv.scrollHeight",botdiv?.scrollHeight);
    botdiv?.scrollTo(0,botdiv?.scrollHeight)
  
  }, [messages]);

  const handleSubmit = () => {
    console.log("enters", userInput);
    // event.preventDefault();

    if (userInput.trim()) {
      const message = {
        user: true,
        text: userInput,
      };
      setMessages((pre) => [...pre, message])

      setLoading(true)
      axios({
        method: 'post',
        url: 'http://192.168.1.120:8000/chat',
        data: { 'userinput': userInput }
      }).then((res) => {
        console.log("res", res);
        // Send the message to the bot
        const botResponse = {
          user: false,
          text: res?.data,
        };
        console.log("messages", messages);
        setMessages((pre) => [...pre, botResponse])

        setLoading(false)
      }, error => {
        setLoading(false)
        console.log("error", error);
        alert(error?.response?.data?.detail)
      })

      // setMessages([...messages, message]);
      setUserInput('');


    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center vh-100 main_chat'>
      <div className='col-lg-6 p-4 '>
        <div className="chat card">
          <div className='card-header '>Chat Bot</div>
          <div className="chat-history card-body" id='botbody'>
            {messages.map((message) => {

              return (<>

                {message.user == true ? (
                 <div className='user_part'>
                   <div className={`chat-message user`}
                    key={message.text}
                  >
                    {message.text}
                  </div>
                 </div>
                 ) :
                  message.user == false && (
                  <div className='bot_part'>
                      <div className={`chat-message bot`}
                      key={message.text}
                    >
                      {message.text}
                    </div>
                  </div>
                  )}
              </>

              )
            })}
          </div>


          <div className="chat-input card-footer">
            <input
              type="text"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              placeholder="Enter your message..."
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
            <button onClick={() => handleSubmit()} disabled={loading?true:false}>Send</button>
            {/* <i class="fa-sharp fa-solid fa-paper-plane-top"></i> */}
            {/* <img src={Send} width={30}/> */}
          </div>
        </div>
      </div>
      {loading&&<div className='loader_part'><img src={Loading_gif}/></div>}
    </div>


  );
};

export default Chat;
