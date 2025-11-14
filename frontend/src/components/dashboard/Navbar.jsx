import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../context/authContext";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-gray-200"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActiveMenu(screenSize > 900);
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative bg-white shadow-sm">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color="#6366F1"
        icon={<AiOutlineMenu />}
      />
      <div className="flex items-center">
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => setIsNotificationOpen(!isNotificationOpen)}
          color="#6366F1"
          icon={<RiNotification3Line />}
        />
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-200 rounded-lg"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <CgProfile size={25} color="#6366F1" />
          <p className="text-gray-600 text-sm">
            Bonjour, <span className="font-bold text-gray-800">{user?.name}</span>
          </p>
          <MdKeyboardArrowDown className="text-gray-600 text-sm" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;