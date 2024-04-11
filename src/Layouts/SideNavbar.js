import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiHome, HiOutlineBriefcase, HiOutlineCog } from 'react-icons/hi';

const SideNavbar = () => {
  return (
    <div style={{background:"#8a2be2"}} className=" h-full w-16 fixed top-0 left-0 z-10">
      <div className="flex flex-col items-start justify-start h-full">
        <NavLink to="/" exact activeClassName="text-white" className="text-gray-300 py-4 px-3 flex items-start justify-start hover:text-white">
          <HiHome className="w-6 h-6" />
        </NavLink>
        <NavLink to="/" activeClassName="text-white" className="text-gray-300 py-4 px-3 flex items-start justify-start hover:text-white">
          <HiOutlineBriefcase className="w-6 h-6" />
        </NavLink>
        <NavLink to="/" activeClassName="text-white" className="text-gray-300 py-4 px-3 flex items-start justify-start hover:text-white">
          <HiOutlineCog className="w-6 h-6" />
        </NavLink>
      </div>
    </div>
  );
};

export default SideNavbar;
