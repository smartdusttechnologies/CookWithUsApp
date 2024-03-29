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
        <BottomNavigation
          showLabels
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <BottomNavigationAction label="Need Help" icon={<HelpIcon />} />
          {/* <Button variant="contained" startIcon={<HelpIcon />}>
            Need Help
          </Button> */}
          <Button
            variant="contained"
            startIcon={<FavoriteIcon />}
            sx={{ height: "40px" }}
            color="secondary"
          >
            Favorites
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{ height: "40px" }}
          >
            Download
          </Button>
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomActionBar;
