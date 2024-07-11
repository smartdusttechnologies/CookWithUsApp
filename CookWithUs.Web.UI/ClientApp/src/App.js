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
    const [role, setRole] = useState("Rider");
    const shouldAddClass = role === 'Rider';
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
                <BothNavBar riderIsActive={riderIsActive} setRiderIsActive={setRiderIsActive} riderSideBar={riderSideBar} setRiderSideBar={setRiderSideBar} isPhone={isPhone} isActive={isActive} setIsActive={setIsActive} activeTab={activeTab} setActiveTab={setActiveTab} role={role } />
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
            </ThemeProvider>
        </div>
    );
}

export default App;
