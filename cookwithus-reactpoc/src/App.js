import './App.css';
import BottomNav from './Components/BottomNavigation/BottomNav';
import Footer from './Components/Footer/Footer';
import ShowMoreMenu from './Components/Menu/ShowMoreMenu';
import NavBar from './Components/NavBar/NavBar';
import AllRoutes from './Components/Routes/AllRoutes';
import LeftSideNavigation from './Components/SideNavigation/LeftSideNavigation';
import Box from '@mui/material/Box';
import ThreeDotBottomNav from './Components/BottomNavigation/ThreeDotBottomNav';
import RightSideNavigation from './Components/SideNavigation/RightSideNavigation';
import { ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import BottomActionBar from './Components/BottomNavigation/BottomActionBar';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const darkMode = useSelector((state) => state.app.darkMode);

  return (
      <div>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <NavBar/>
          <Box sx={{ display: 'flex' }}>
            <LeftSideNavigation/>
            <AllRoutes/>
            <RightSideNavigation/>
          </Box>
          <ShowMoreMenu/>
          <ThreeDotBottomNav/>
          <Footer/>
          <BottomNav/>
          <BottomActionBar/>
        </ThemeProvider>
      </div>
  );
}

export default App;
