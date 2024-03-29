import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationBellMenu from "../NotificationBell/NotificationBellMenu";
import UserAccountMenu from "../UserProfile/UserAccountMenu";
import AuthContext from "../../context/AuthProvider";
import { ThemeProvider, Tooltip, createTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LocationSelector from "../LocationSelector/LocationSelector";
import { useDispatch, useSelector } from "react-redux";
import {
    setRightSideNavigationOpen,
    setisMenuOpen,
    setisSideNavOpen,
    toggleDarkMode,
} from "../../state";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export default function NavBar() {
    const dispatch = useDispatch();
    const isSideNavOpen = useSelector((state) => state.app.isSideNavOpen);
    const darkMode = useSelector((state) => state.app.darkMode);
    const isRightSideNavigationOpen = useSelector(
        (state) => state.app.isRightSideNavigationOpen
    );

    return (
        //<Box sx={{ flexGrow: 1 }}>
        //  <AppBar position="static">
        //    <Toolbar
        //      sx={{
        //        "@media (max-width: 500px)": {
        //          flexDirection: "column",
        //        },
        //      }}
        //    >
        //      <IconButton
        //        size="large"
        //        edge="start"
        //        color="inherit"
        //        aria-label="open drawer"
        //        onClick={() => dispatch(setisSideNavOpen({}))}
        //        sx={{
        //          marginRight: "36px",
        //          "@media (max-width: 500px)": {
        //            display: "none",
        //          },
        //        }}
        //      >
        //        {!isSideNavOpen ? <MenuIcon /> : <ChevronLeftIcon />}
        //      </IconButton>
        //      <Typography
        //        variant="h6"
        //        noWrap
        //        component="div"
        //        sx={{
        //          "@media (max-width: 500px)": {
        //            marginLeft: "30px",
        //          },
        //        }}
        //      >
        //        Cook With Us
        //      </Typography>
        //      {/* <Search>
        //        <SearchIconWrapper>
        //          <SearchIcon />
        //        </SearchIconWrapper>
        //        <StyledInputBase
        //          placeholder="Search…"
        //          inputProps={{ "aria-label": "search" }}
        //        />
        //      </Search> */}
        //      <Box sx={{ flexGrow: 1 }} />
        //      <Box
        //        sx={{
        //          display: "flex",
        //          alignItems: "center",
        //          "@media (max-width: 500px)": {
        //            width: "100%",
        //            justifyContent: "space-around",
        //          },
        //        }}
        //      >
        //        {/* ShowMore For Phone Mode  */}
        //        <IconButton
        //          size="large"
        //          edge="start"
        //          color="inherit"
        //          aria-label="open drawer"
        //          onClick={() => dispatch(setisMenuOpen({}))}
        //          sx={{
        //            display: "none",
        //            alignItems: "center",
        //            "@media (max-width: 500px)": {
        //              display: "flex",
        //            },
        //          }}
        //        >
        //          <MenuIcon />
        //        </IconButton>
        //        {/* ShowMore For Phone Mode  */}

        //        <Tooltip
        //          title={!darkMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
        //        >
        //          <IconButton
        //            size="large"
        //            color="inherit"
        //            onClick={() => dispatch(toggleDarkMode({}))}
        //          >
        //            {darkMode ? (
        //              <LightModeIcon
        //                sx={{ width: 26, height: 26, color: "white" }}
        //              />
        //            ) : (
        //              <DarkModeIcon
        //                sx={{ width: 26, height: 26, color: "white" }}
        //              />
        //            )}
        //          </IconButton>
        //        </Tooltip>

        //        <LocationSelector />

        //        <NotificationBellMenu />

        //        <UserAccountMenu />

        //        <Tooltip title={!isRightSideNavigationOpen ? "Open" : " Close"}>
        //          <IconButton
        //            size="large"
        //            color="inherit"
        //            onClick={() => dispatch(setRightSideNavigationOpen({}))}
        //            sx={{
        //              "@media (max-width: 500px)": {
        //                display: "none",
        //              },
        //            }}
        //          >
        //            {!isRightSideNavigationOpen ? (
        //              <MoreVertIcon />
        //            ) : (
        //              <ChevronRightIcon />
        //            )}
        //          </IconButton>
        //        </Tooltip>
        //      </Box>
        //    </Toolbar>
        //  </AppBar>
        //</Box>

        <header class="_76q0O"><div class="global-nav"><div class="_1EuBh"><a href="/" class="d9y3g" title="Swiggy"></a>
            <div role="button" class="_2z2N5" tabindex="0"><span class="_1tcx6 _34oCb">
                <span class="_3odgy">Work</span></span><span class="_3HusE">Chhoti Badalpura, Bihar 801105, India (Khagaul)</span>
                <span class="icon-downArrow kVKTT"></span></div><ul class="_1JNGZ"><li class="_1fo6c"><div class="_1fmVk _30y3a"><div>
                    <div class="_2CgXb"><a class="_1T-E4" href="/checkout"><span class="_3yZyp _18ZFk"><svg class="_1GTCc _173fq" viewBox="-1 0 37 32" height="20" width="20" fill="#686b78"><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg><span class="_2vS77">1</span></span><span>Cart</span>
                    </a></div></div></div></li><li class="_1fo6c"><div class="_1fmVk _30y3a"><div><div class="_2CgXb">
                        <a class="_1T-E4" href="/my-account"><span class="_3yZyp"></span><span class="_1qbcC">ritesh kumar</span></a></div>
                    </div></div></li><li class="_1fo6c"><div class="_2CgXb"><a class="_1T-E4" href="/support"><span class="_3yZyp"></span>Help</a>
                    </div></li><li class="_1fo6c"><div class="_2CgXb"><a class="_1T-E4" href="/offers-near-me"><span class="_3yZyp"></span>Offers<span class="PJaej">NEW</span></a>
                    </div></li><li class="_1fo6c"><div class="_2CgXb"><a class="_1T-E4" href="/search"><span class="_3yZyp">
                </span><span>Search</span></a></div></li></ul></div></div></header>

    );
}
