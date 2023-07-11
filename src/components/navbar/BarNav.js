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
import { Avatar, Badge, Space, Modal, List, Card } from 'antd';
import { Link } from 'react-router-dom';

export default function BarNav() {
  const { width } = useWindowSize();
  const { login } = useStateContext();
  const [data, setData] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const prevCountRef = useRef(0);

  useEffect(() => {
    doApi();
    doApiGetContact();
  }, []);

  useEffect(() => {
    const prevCount = localStorage.getItem('prevCount');
    if (prevCount) {
      prevCountRef.current = parseInt(prevCount, 10);
    }
  }, []);

  const doApi = async () => {
    const url = API_URL + '/users/userInfo';
    try {
      const response = await apiGet(url);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const doApiGetContact = async () => {
    const url = API_URL + '/contact/contactList';
    try {
      const response = await apiGet(url);
      const { count, data } = response;
      const reversedCount = count.toString().split('').reverse().join('');
      setTotalCount(reversedCount);
      setData(data);
      if (data.length > 0 && count > prevCountRef.current) {
        toast.success('נכנסה הודעה חדשה');
      }
      prevCountRef.current = count;
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailClick = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  let showBurgerElement = width <= 768;

  return (
    <>
      {showBurgerElement && <BurgerModal />}
      {login === 2 && (
        <div>
          <div className='navbar text-white hidden md:flex h-[70px] login2 pr-6 sticky-top border-b border-gray-300'>
            ברוך הבא - {data.name}
            <div className='ml-4 cursor-pointer  p-1 rounded-full '>
              <Space size='large'>
                <Badge count={totalCount}>
                  <HiOutlineMail className='text-xl   mt-1 h-8 border-2 rounded-full w-10 p-0.5 text-[#017193] border-[#017193]' onClick={() => handleEmailClick(data)} />
                </Badge>
              </Space>
            </div>
          </div>
        </div>
      )}
      {login === 3 && (
        <div className='navbar border-e-slate-950 text-stone-300 hidden md:flex h-[70px] login3 pr-6'>
          ברוך הבא - {data.name}
        </div>
      )}
      <Modal
        title={`הודעות ממשתמש: ${selectedContact?.name}`}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        style={{ maxHeight: '500px'}}
      >
        <div style={{ maxHeight: '350px', overflowY: 'scroll' }}>
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
  <Card
    style={{ background: '#9A8475', color: 'white', border: '1px solid #e0e0e0', marginBottom: 10, flex: 1 }}
    bodyStyle={{ padding: 16 }}
  >
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
          marginRight: 10,
          marginLeft:10,
          marginBottom:5
          
        }}
      >
        <span style={{ color: 'white', fontSize: 20 }}>{item.name[0]}</span>
      </div>
      <div>
        <h3 style={{ margin: 0, fontSize: 18, color: 'red' }}>{item.name}</h3>
      </div>
    </div>
        <Link onClick={() => window.location.href = `mailto:${item.email}`}>{item.email}</Link>
    <p>
      <strong>טלפון:</strong> {item.phone}
    </p>
    <p className='text-orange-200'>
      <strong className='text-white'>הודעה:</strong> {item.message}
    </p>
    <p>
    <strong>נשלחה בתאריך:</strong> {new Date(item.date_created).toLocaleDateString('en-US')}    </p>
  </Card>
</List.Item>

            )}
          />
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}
