import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/colorKit.css';
import BurgerModal from '../burgers/burgerModal';
import { useWindowSize } from '../../services/hooks/screenSizeHook';
import { useStateContext } from '../../context';
import { API_URL } from '../../constant/url';
import { apiGet } from '../../services/apiServices';
import { HiOutlineMail } from 'react-icons/hi';
import { Badge, Space, Modal, List, Card } from 'antd';
import { Link } from 'react-router-dom';

const BarNav = () => {
  const { width } = useWindowSize();
  const { login } = useStateContext();
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  const prevCountRef = useRef(0);

  useEffect(() => {
    doApi();
    doApiGetContact();
  }, []);

  const doApi = async () => {
    const url = API_URL + '/users/userInfo';
    try {
      const response = await apiGet(url);
      setData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const doApiGetContact = async () => {
    const url = API_URL + '/contact/contactList';
    try {
      const response = await apiGet(url);
      const { count, data: responseData } = response;
      const reversedCount = count.toString().split('').reverse().join('');
      setTotalCount(reversedCount);
      setDataCount(responseData);
      if (responseData.length > 0 && count > prevCountRef.current) {
        const newMessage = responseData[0].message; // Assuming the new message is the first one in the array
        setNewMessage(newMessage);
        localStorage.removeItem('toastShown'); // Clear the toastShown flag when new messages arrive
        // toast.success('New message received!');
      }
      prevCountRef.current = count;
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = (e) => {
    console.log(e, 'I was closed.');
  };

  const handleEmailClick = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  let showBurgerElement = width <= 768;

  return (
    <>
      <ToastContainer />
      {showBurgerElement && <BurgerModal />}
      {login === 2 && (
        
          <div className='navbar text-white hidden md:flex h-[70px] login2 pr-6 sticky top-0 border-b border-slate-600'   // Set the desired z-index value
        >
            ברוך הבא {data.name}
            <div className='ml-4 cursor-pointer  p-1 rounded-full '>
              <Space size='large'>
                <Badge count={totalCount}>
                  <HiOutlineMail
                    className='text-xl mt-1 h-8 border-2 rounded-full w-10 p-0.5 text-[#017193] border-[#017193]'
                    onClick={() => handleEmailClick(data)}
                  />
                </Badge>
              </Space>
            </div>
          </div>
        
      )}
      {login === 3 && (
        <div className='navbar  border-b border-b-slate-600 text-stone-300 hidden md:flex h-[70px] login3 pr-6 sticky-top'>
          ברוך הבא {data.name}
        </div>
      )}
      <Modal
        title={`הודעות אחרונות`}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        className="custom-modal" // Add custom CSS class name
        style={{ zIndex: 9999 }} // Set the desired z-index value
      >
        <div style={{ maxHeight: '350px', overflowY: 'scroll' }}>
          <List
            dataSource={dataCount}
            renderItem={(item) => (
              <List.Item>
                <Card style={{ background: '#292524', color: 'white', border: '1px solid #e0e0e0', marginBottom: 10, flex: 1, marginLeft: 14, boxShadow: 'inset 1px 4px 2px red' }} bodyStyle={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        backgroundColor: 'red',
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 10,
                        marginBottom: 5,
                      }}
                    >
                      <span style={{ color: 'white', fontSize: 20 }}>{item.name[0]}</span>
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 18, color: 'red' }}>{item.name}</h3>
                    </div>
                  </div>
                  <Link className='text-blue-600' onClick={() => (window.location.href = `mailto:${item.email}`)}>
                    {item.email}
                  </Link>
                  <p>
                    <strong>טלפון:</strong> {item.phone}
                  </p>
                  <p className='text-red-300'>
                    <strong className='text-white ml-2'>הודעה:</strong> {item.message}
                  </p>
                  <p className=' ml-2'>
                    <strong>נשלחה בתאריך:</strong> {new Date(item.date_created).toLocaleDateString('en-US')}{' '}
                  </p>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default BarNav;
