import "./App.css";
import { useMediaQuery } from 'react-responsive';
import BottomNav from "./Components/BottomNavigation/BottomNav";
import Footer from "./Components/Footer/Footer";
import ShowMoreMenu from "./Components/Menu/ShowMoreMenu";
import AllRoutes from "./Components/Routes/AllRoutes";
import LeftSideNavigation from "./Components/SideNavigation/LeftSideNavigation";
import Box from "@mui/material/Box";
import ThreeDotBottomNav from "./Components/BottomNavigation/ThreeDotBottomNav";
import RightSideNavigation from "./Components/SideNavigation/RightSideNavigation";
import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import BottomActionBar from "./Components/BottomNavigation/BottomActionBar";
import ThreedotMenu from "./Components/Menu/ThreedotMenu";
import React, { useState,useEffect } from 'react';
import BothNavBar from "./Components/NavBar/BothNavBar";
import { AuthProvider } from "./Pages/AuthProvider";


const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const darkMode = useSelector((state) => state.app.darkMode);
    const [isActive, setIsActive] = useState(false);
    const [riderIsActive, setRiderIsActive] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    const useroleProfile = localStorage.getItem('profile') || 'User';
    const [role, setRole] = useState(useroleProfile);//set Option 1. User, 2. Rider, 3. Restaurant
    const shouldAddClass = role === 'Rider';
    const [token, setToken] = useState(null);
    useEffect(() => {
        // Only update localStorage if the role has changed and is valid
        const validRoles = ['User', 'Restaurant', 'Rider'];

        if (validRoles.includes(role)) {
            localStorage.setItem('profile', role);
            console.log("Updated role in localStorage:", role);
        } else {
            console.log("Invalid role, not updating localStorage");
        }
    }, [role]);
    useEffect(() => {
        if (role === 'Rider') {
            document.body.style.backgroundColor = 'black';
        } else {
            document.body.style.backgroundColor = '';
        }
    }, [role]);
    const isPhone = useMediaQuery({ query: '(max-width: 768px)' });
    const [riderSideBar, setRiderSideBar] = useState(false);
    return (
        <div className={shouldAddClass ? 'main-container' : ''}>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <AuthProvider>
                    <BothNavBar setRole={setRole} riderIsActive={riderIsActive} setRiderIsActive={setRiderIsActive} riderSideBar={riderSideBar} setRiderSideBar={setRiderSideBar} isPhone={isPhone} isActive={isActive} setIsActive={setIsActive} activeTab={activeTab} setActiveTab={setActiveTab} role={role} />
                    {/*<ThreedotMenu />*/}
                    <Box sx={{ display: "flex" }}>
                        {/*<LeftSideNavigation />*/}
                        <Box sx={{ width: "100%" }}>
                            <AllRoutes riderSideBar={riderSideBar} setRiderSideBar={setRiderSideBar} isPhone={isPhone} role={role} setRole={setRole} setActiveTab={setActiveTab} activeTab={activeTab} isActive={isActive} />
                        </Box>
                        {/* <RightSideNavigation />*/}
                    </Box>
                    {/*<ShowMoreMenu />*/}
                    {/*<ThreeDotBottomNav />*/}
                    {/*<Footer />*/}
                    {/*<BottomNav />*/}
                    {/*<BottomActionBar />*/}
                </AuthProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;