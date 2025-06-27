import React from 'react';
import Sidebarlayout from './Sidebarlayout';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
    <div className='dashboard-layout'>
      <Sidebarlayout />
          <div className='dashboard-main'>
            <Outlet />
          </div>
      </div>
    </>
  );
};

export default UserLayout;
