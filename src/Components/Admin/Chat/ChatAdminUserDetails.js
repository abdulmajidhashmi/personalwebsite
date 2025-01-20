import { Alert, Flex, Spin } from 'antd';
import './ChatAdmin.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
const ChatAdminUserDetails = ()=>{
    const [loading, setloading] = useState(true);
    const [updateData,setUpdateData] =useState(null);
    const [userData,setUserData] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{

        const checktoken =async()=>{
    
         const tokendata =  await axiosInstance.get('/user/check-token',{withCredentials:true});
        
         if(tokendata.data.success===false){
    
          navigate("/login");
        }
        }
        checktoken();
        
       
      },[]);

      useEffect(()=>{

        fetchUserData();

      },[navigate]);

      const handleUserClick = (userId) => {
        // setToUserId(userId);
        navigate(`/admin/chat/${userId *11}`);
      };
      const fetchUserData = async () => {
        try {
          
          const response = await axiosInstance.get("/user/all",{withCredentials:true});
          setUserData(response.data.data);
          if (response.data.data.role === "admin") {
            // setToUserId(response.data.data.number);
            // setShow(false);
          } else {
            setUpdateData(response.data.data);
          }
          setloading(false);
        } catch (err) {
          console.error(err);
          setloading(false);
        }
      };

    return loading ? (
    
        <Flex  className="loader" gap="middle">
         
          <Spin tip="Loading" size="large">
        
          </Spin>
        </Flex>
      ) : (

        <>


<div class="sidebar">
        {!updateData ? (
          <div class="sidebar-header">
            <div class="search-wrapper">
              <input
                type="text"
                placeholder="Search conversations..."
                class="search-input"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        ) : null}

        <div class="conversations-list">
          {updateData.length
            ? updateData.map(
                (user, index) =>
                 (
                    <div
                      key={index}
                      onClick={() => handleUserClick(user.number)}
                      class={
                        index === 0 ? "conversation active" : "conversation"
                      }
                    >
                      <img
                        src="https://avatar.iran.liara.run/public"
                        alt="Contact"
                        class="conversation-avatar"
                      />
                      <div class="conversation-details">
                        <h3 class="conversation-name">{user.name}</h3>
                        <p class="conversation-snippet">
                          Thanks for the consultation...
                        </p>
                      </div>
                      <div class="conversation-time">2m</div>
                    </div>
                  )
              )
            : null}
        </div>
      </div>
        </>
    )
}

export default ChatAdminUserDetails;