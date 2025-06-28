import { useNavigate } from 'react-router-dom';
import '../styles/userdashboard.css';
import React, { useEffect, useState } from 'react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState(null);

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log('No token found');
    navigate("/login");
    return;
  }
  fetch('http://easypark.atwebpages.com/fetch_details.php',{
    headers:{
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res)=>res.json())
  .then((data)=>{
    if(data.success){
      console.log("fetch response:", data);
      setUserdata(data.user)
    }else{
      console.warn("Invalid token or user not found");
      navigate('/login');
    }
  })
  .catch((err)=>{
    console.error("Fetch error:" ,err);
    navigate("/login");
  });
 },[navigate]);

  return (
    <div className='dashboard-container'>
      <h1 className='message'>Welcome, {userdata?.full_name || 'user'}</h1>
      {userdata && (
        <div className='details'>
          <h3>User Details</h3>
          <p><strong>Email:</strong>{userdata.email}</p>
          <p><strong>Phone:</strong>{userdata.phone}</p>
          <p><strong>Vehcile Number:</strong>{userdata.vehicleno}</p>
          <p><strong>Vehicle Type:</strong>{userdata.vehicletype}</p>
          <p><strong>Vehicle Colour:</strong>{userdata.vehiclecol}</p>
          <p><strong>Time created:</strong>{userdata.created_at}</p>
        </div>
      )}
    </div>
  );
};
export default UserDashboard;