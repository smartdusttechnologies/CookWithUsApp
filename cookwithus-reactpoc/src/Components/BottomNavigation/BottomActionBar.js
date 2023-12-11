import React from "react";
import { Box, Button, Paper } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DownloadIcon from "@mui/icons-material/Download";
import HelpIcon from "@mui/icons-material/Help";

const BottomActionBar = () => {
  const [value, setValue] = React.useState(null);

  return (
    <Box
      sx={{
        "@media (max-width: 500px)": {
          display: "none",
        },
      }}
    >
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Box
          // showLabels
          // value={value}
          // onChange={(event, newValue) => {
          // setValue(newValue);
          // }}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "53px",
          }}
        >
          {/* <BottomNavigationAction label="Need Help" icon={<HelpIcon />} /> */}
          <Button variant="contained" startIcon={<HelpIcon />}>
            Need Help
          </Button>
          <Button variant="contained" startIcon={<FavoriteIcon />}>
            Favorites
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Download
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BottomActionBar;
