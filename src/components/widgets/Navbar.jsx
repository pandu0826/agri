import React, { useState } from 'react';
import Text from '../elements/Text';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { Box, Divider, List, Modal } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [state, setState] = useState({
        left: false,
    });

    const user = useSelector((state) => state.user.value);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
            console.log("Signed out successfully");
        }).catch((error) => {
            console.error("Logout Error: ", error);
        });
    };

    const handleOpenNavbar = () => {
        setOpen(prev => !prev);
    };

    const handleViewProfile = () => {
        setProfileOpen(true);
    };

    const handleCloseProfile = () => {
        setProfileOpen(false);
    };

    const list = (anchor) => (
        <Box
            className="bg-gray-900 h-screen text-white shadow-lg"
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Divider className="border-gray-700" />
            <List>
                <div>
                    <ul>
                        <Text className="pl-4 text-3xl mt-6 font-extrabold mb-12 text-gradient">
                            Focus<span className="text-gradient-secondary">Vest</span>
                        </Text>
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                isActive ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white block border-l-4 border-blue-400 mr-2 py-3 text-sm font-medium transition-transform transform hover:scale-105"
                                    :
                                    "text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white block mr-2 py-3 text-sm font-medium transition-transform transform hover:scale-105"
                            }
                        >
                            <li className="p-4">Home</li>
                        </NavLink>
                        <NavLink
                            to="/notes"
                            className={({ isActive }) =>
                                isActive ? "bg-gradient-to-r from-green-500 to-green-600 text-white block border-l-4 border-green-400 mr-2 py-3 text-sm font-medium transition-transform transform hover:scale-105"
                                    :
                                    "text-gray-300 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white block mr-2 py-3 text-sm font-medium transition-transform transform hover:scale-105"
                            }
                        >
                            <li className="p-4">Notes</li>
                        </NavLink>
                    </ul>
                </div>
            </List>
        </Box>
    );

    return (
        <>
            <nav className="flex justify-between px-4 py-4 bg-gray-800 shadow-lg">
                <div className='flex items-center space-x-4'>
                    <div className='md:hidden block'>
                        {['left'].map((anchor) => (
                            <div className='flex items-center' key={anchor}>
                                <button onClick={toggleDrawer(anchor, true)} className="p-2 text-white focus:outline-none">
                                    <FaBars className='text-white text-3xl' />
                                </button>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    {list(anchor)}
                                </SwipeableDrawer>
                            </div>
                        ))}
                    </div>
                    <Text className="text-white font-bold text-2xl hover:text-gray-300 transition-colors">
                        Welcome, <span className="text-blue-400">{user.displayName}</span>
                    </Text>
                </div>

                <div className='relative'>
                    <BsPersonCircle onClick={handleOpenNavbar} className='cursor-pointer text-white text-4xl' />
                    {
                        open && (
                            <div className='absolute top-12 right-0 flex flex-col items-end bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-50 p-4 space-y-4'>
                                <button 
                                    className="px-6 py-2 text-sm text-white bg-blue-600 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                                    onClick={handleViewProfile}
                                >
                                    View Profile
                                </button>
                                <button 
                                    className="px-6 py-2 text-sm text-white bg-red-600 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )
                    }
                </div>
            </nav>

            <Modal
                open={profileOpen}
                onClose={handleCloseProfile}
                aria-labelledby="profile-modal-title"
                aria-describedby="profile-modal-description"
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white p-8 rounded-lg shadow-lg border border-gray-700 transition-all duration-300 ease-in-out">
                    <h2 id="profile-modal-title" className="text-2xl font-bold mb-4 text-gradient">Login Information</h2>
                    <p id="profile-modal-description" className="text-sm mb-2">Name: <span className="font-semibold">{user.displayName}</span></p>
                    <p id="profile-modal-email" className="text-sm mb-6">Email: <span className="font-semibold">{user.email}</span></p>
                    <div className="flex space-x-4">
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                            onClick={() => navigate('/home')}
                        >
                            Home
                        </button>
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                            onClick={() => navigate('/edit-profile')}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Navbar;
