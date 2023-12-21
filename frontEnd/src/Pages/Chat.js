import React, { useState, useEffect } from 'react'
import axios from 'axios';
import chatbotimg from '../Assets/Images/chatbot01.png'
import './Chat.css';

function Chat() {

  const [chatMsg, setChatMsg] = useState([])
  const [userInput, setUserInput] = useState('')
  const botdiv = document.getElementById('botbody');




  // Function to handle click outside the modal
  // const handleClickOutside = (event) => {
  //   // console.log(typeof(event.target.className),typeof(event.target.className)=='string');
  //   if (typeof (event.target.className) == 'string') {
  //     if (event.target.className?.includes('vh-100') && showModal == true) {
  //       setShowModal(false)
  //     }
  //   }
  // };

  const handleCloseModel = () => {
    setShowModal(false)
  };

  // document.addEventListener('mousedown', handleClickOutside);

  // Function to toggle modal visibility
  const toggleModal = () => {
    // console.log("toggle Model enters");
    setShowModal(!showModal);
  };


  // chatbot modal show in modal
  const [showModal, setShowModal] = useState(false);

  const chatBotCall = () => {
    console.log("enters");
    if (userInput.trim() != '') {
      var last_index = chatMsg.length
      console.log("msg", userInput);
      setChatMsg([...chatMsg, { usermsg: userInput, botmsg: 'Typing ......' }]);
      axios({
        method: 'post',
        // url: 'http://192.168.1.120:8000/chat',
        // url: 'https://openai-chatbot-qvzo.onrender.com/chat',

        // local
        // url: 'http://13.200.148.54:8000/chat',

        // live
        // url: 'https://13.200.148.54/chat'
        url: 'https://bot.quadnomics.in/chat',
        data: { 'userinput': userInput }
      }).then((res) => {
        console.log("res chatbot; ", res);
        setChatMsg([...chatMsg.slice(0, last_index), { 'usermsg': userInput, 'botmsg': res.data }])
      }).catch((error) => {
        console.log("Error", error);
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim() != '') {
      chatBotCall();
      setUserInput('')
    }
  }

  useEffect(() => {
    console.log("botdiv.scrollHeight", botdiv?.scrollHeight);
    botdiv?.scrollTo(0, botdiv?.scrollHeight)

  }, [chatMsg]);


  return (
    <div className='bg_Img vh-100'>
      {/* Chatbot section */}
      <div className='Chatbot-place bottom-icon1'>
       <a id='newMoM' className=" signout button111-1" onClick={toggleModal}>
          <img src={chatbotimg} className="bot_img" alt='chatbot' onClick={toggleModal} />
        </a>

        {/* {showModal==false&&(<a id='newMoM' className=" signout button111-1" onClick={toggleModal}>
          <img src={chatbotimg} className="bot_img" alt='chatbot' onClick={toggleModal} />
        </a>)} */}
      </div>






      {/* Chatbot Modal */}
      <div className={`modal chatModel d-flex justify-content-center align-items-center p-4 vh-100 ${showModal ? 'd-block' : 'd-none'} `} tabIndex={-1}>
        <div className="card card-design circular-animation"
        // style={{ width: "30%", borderRadius: '20px', padding: '10px' }}
        >
          <div className="card-header text-start px-0" style={{ fontFamily: 'cursive' }}>
            <span className='d-flex align-items-center justify-content-between'>
              <div className='mx-2'>
              <b className='me-1'>ChatBot...</b>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894m-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
              </svg>
              </div>
              
            
            <div className='cancel-icon' onClick={()=>{handleCloseModel()}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
          </span>
          </div>
          
          <div className="card-body custum_body_fix" id='botbody'>
            {chatMsg.map((msg, index) => (
              <>
                <div className='form-group my-3 user_part'>
                  <div className='user-message' >
                    {msg.usermsg}
                  </div>
                </div>
                <div className='form-group my-3 bot_part'>
                  <div
                    className='form-control bot-message'
                  >{msg.botmsg}</div>
                </div>

              </>


            ))}
          </div>
          <div className="card-footer d-flex justify-content-between px-0">
            <input
              className='form-control mx-1'
              type="text"
              placeholder="Type away..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button type='button' className='btn btn-sm btn-secondary text-black fw-bold mx-1' onClick={() => [chatBotCall(), setUserInput('')]}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat