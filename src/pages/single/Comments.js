import React, { useState, useEffect } from 'react';
import { IoSendSharp } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { apiPut, apiPatch, apiGet } from '../../services/apiServices';
import { API_URL } from '../../constant/url';
import { useStateContext } from '../../context';
import { Modal } from 'antd';
import Files from './files';
import { HiOutlineDocumentAdd } from "react-icons/hi";
import '../../style/colorKit.css';

export default function Comments({ setCommentResp }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [recipient, setRecipient] = useState('');
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { client } = useStateContext();









  
  const saveComment = async (text) => {
    try {
      const payload = {
        text: text
      };


      // Adjust the API endpoint and HTTP request method based on your server routes
      const resp = await apiPut(API_URL + '/users/' + recipient + '/comments', payload);
      setCommentResp(resp);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleSendMessage = () => {
    if (inputText.trim() !== '' && recipient !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputText.trim(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      saveComment(newMessage.text);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete the message?')) {
      const updatedMessages = messages.filter((message) => message.id !== messageId);
      setMessages(updatedMessages);
    }
  };

  return (
    <div>
      <div className='font-medium text-neutral-300 p-[10px] flex justify-between login2  rounded-t-lg'>
        <span>הודעות אחרונות</span>
      </div>
      <div className="flex flex-col h-[70vh]">
        <div className="flex flex-col flex-1 md:p-4 p-2 overflow-y-scroll scrollbar-track-gray-200 colors2">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.id % 2 === 0 ? 'justify-end ' : 'justify-start'} mb-4`}>
              <IoIosContact className="m-2 text-2xl text-blue-300" />
              <div className={`rounded-lg p-2 w-1/2 md:w-1/3 ${message.id % 2 === 0 ? 'custom-shadow text-white rounded-t-none' : 'custom-shadow2 bg-blue-300 rounded-t-none text-black'}`}>
                <span className="flex-grow">
                  {message.text}
                </span>
              </div>
              <button className="hover:text-red-500 mr-2 text-xl text-red-400" onClick={() => handleDeleteMessage(message.id)}>
                <MdDeleteForever />
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 login2 rounded-b-lg shadow-inner">
          <div className="flex h-10">
            <button
              onClick={() => setOpenModal(true)}
              className="py-2 ml-2 px-4 text-blue-200 rounded-lg custom-shadow hover:border-blue-300 text-xl"
            >
              <HiOutlineDocumentAdd />
            </button>
            <button
              onClick={handleSendMessage}
              className="py-2 px-4 custom-shadow text-blue-200 rounded-lg rounded-l-none"
            >
              <IoSendSharp />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="כתוב כאן את ההודעה..."
              className="w-full py-2 px-3 text-white -2 rounded-r-none border-blue-400 focus:outline-none colors2 focus:border-blue-300 rounded-lg custom-shadow"
            />
           
          </div>
          <Modal
            style={{ paddingLeft: '0px' }}
            centered
            open={openModal}
            onCancel={() => setOpenModal(false)}
            width={1500}
            footer={null}
          >
            <Files />
          </Modal>
        </div>
      </div>
    </div>
  );
}
