import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaClock, FaThLarge, FaDoorOpen, FaUserPlus, FaUser } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4">
      <h1 className="text-xl font-bold mb-6 flex items-center">
        <span className="text-2xl mr-2"></span> Système de sécurité des hôtels
      </h1>
      <nav>
        <h2 className="text-gray-500 text-sm mb-2">DASHBOARD</h2>
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-[#6366F1] text-white" : "text-gray-700"} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <FaThLarge className="mr-3" /> Dashboard
        </NavLink>

        <h2 className="text-gray-500 text-sm mt-4 mb-2">PAGES</h2>
        <NavLink
          to="/admin-dashboard/Bébés/List"
          className={({ isActive }) =>
            `${isActive ? "bg-[#6366F1] text-white" : "text-gray-700"} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <FaUser className="mr-3" /> Liste des hôtes
        </NavLink>

        <NavLink
          to="/admin-dashboard/Guests/Add"
          className={({ isActive }) =>
            `${isActive ? "bg-[#6366F1] text-white" : "text-gray-700"} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <FaUserPlus className="mr-3" /> Ajouter un hôte
        </NavLink>

        <NavLink
          to="/admin-dashboard/Guests/DetailleGuest/:roomNumber"
          className={({ isActive }) =>
            `${isActive ? "bg-[#6366F1] text-white" : "text-gray-700"} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaClock className="mr-3" /> Détails de l'hôte
        </NavLink>

        <NavLink
          to="/admin-dashboard/pages/Controle"
          className={({ isActive }) =>
            `${isActive ? "bg-[#6366F1] text-white" : "text-gray-700"} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
          end
        >
          <FaDoorOpen className="mr-3" /> Contrôle
        </NavLink>

        <NavLink
          to="/admin-dashboard/pages/Historique"
          className={({ isActive }) =>
            `${isActive ? "bg-[#6366F1] text-white" : "text-gray-700"} flex items-center space-x-4 block py-2.5 px-4 rounded`
          }
        >
          <FaClock className="mr-3" /> Historique De Participation
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
