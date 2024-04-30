import "./App.css";
import BottomNav from "./Components/BottomNavigation/BottomNav";
import Footer from "./Components/Footer/Footer";
import ShowMoreMenu from "./Components/Menu/ShowMoreMenu";
import NavBar from "./Components/NavBar/NavBar";
import AllRoutes from "./Components/Routes/AllRoutes";
import LeftSideNavigation from "./Components/SideNavigation/LeftSideNavigation";
import Box from "@mui/material/Box";
import ThreeDotBottomNav from "./Components/BottomNavigation/ThreeDotBottomNav";
import RightSideNavigation from "./Components/SideNavigation/RightSideNavigation";
import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import BottomActionBar from "./Components/BottomNavigation/BottomActionBar";
import ThreedotMenu from "./Components/Menu/ThreedotMenu";
import RestaurantSideBar from "./Components/RestaurantUi/SideBar/RestaurantSideBar";
import RestaurantTopBar from "./Components/RestaurantUi/TopBar/RestaurantTopBar";
import React, { useState } from 'react';

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
    
    return (
        <div>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <RestaurantSideBar />
                <RestaurantTopBar isActive={isActive} setIsActive={setIsActive} />
                {/*<NavBar />*/}
                {/*<ThreedotMenu />*/}
                <Box sx={{ display: "flex" }}>
                  {/*  <LeftSideNavigation />*/}
                    <Box sx={{ width: "100%" }}>
                        <AllRoutes isActive={isActive} />
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
