import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Box, List, ListItem, ListItemText, Typography, Drawer, CssBaseline, Divider, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WorkIcon from '@mui/icons-material/Work';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import AllJobs from "./AllJobs";
import AddJob from "./AddJob";
import Messages from "./Messages";
import Applicants from "./Applicants";
import CountDown from "../app/Session";
import { useAuth } from "../context/AuthContext";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import Home from "./Home";

const drawerWidth = 260;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { user, expire, logout } = useAuth()


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarItems = [
    { text: 'Dashboard', active: 'home', icon: <HomeIcon />},
    { text: "Jobs", active: 'jobs', icon: <WorkIcon /> },
    { text: "Add Job", active: 'add-job', icon: <AddBoxIcon /> },
    { text: "Applicants", active: 'applicants', icon: <PersonIcon /> },
    { text: "Messages", active: 'messages', icon: <MessageIcon /> },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'jobs':
        return <AllJobs />;
      case 'home':
        return <Home setActiveSection={setActiveSection} />
      case 'add-job':
        return <AddJob />;
      case 'messages':
        return <Messages />
      case 'applicants':
        return <Applicants /> 
      default:
        return <Typography variant="h6">Select a section</Typography>;
    }
  };

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100vh",
        backgroundColor: "#ffffff",
        padding: 2,
        borderRight: "1px solid #e0e0e0",
      }}
    >
      {/* Sidebar Header */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontFamily: "Poppins",
          padding: "15px",
          color: "#333",
        }}
      >
        Admin Panel
      </Typography>
      <Divider />

      {/* Sidebar Menu */}
      <List sx={{ display: "flex", flexDirection: "column", height: 'calc(100% - 50px)' }}>
      {sidebarItems.map((item, index) => (
          <ListItem
            key={index}
            button
            onClick={() => setActiveSection(item.active)}
            sx={{
              borderLeft: activeSection === item.active ? "5px solid #408663" : "",
              backgroundColor: activeSection === item.active ? "rgba(64, 134, 99, 0.15)" : "transparent",
              color: activeSection === item.active ? "#408663" : "#666",
              "&:hover": {
                backgroundColor: "rgba(64, 134, 99, 0.1)",
                cursor: "pointer",
              },
              transition: "background-color 0.3s ease, border-left 0.3s ease",
              padding: "12px 15px",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>{item.icon}</Box>
            <ListItemText sx={{ marginLeft: "12px" }} primary={item.text} />
          </ListItem>
        ))}
        <ListItem
            button
            onClick={logout}
            sx={{
              backgroundColor: "transparent",
              color: "#666",
              "&:hover": {
                backgroundColor: "rgba(64, 134, 99, 0.1)",
                cursor: "pointer",
              },
              marginTop:'auto',
              transition: "background-color 0.3s ease",
              padding: "12px 15px",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>{<ExitToAppIcon />}</Box>
            <ListItemText sx={{ marginLeft: "12px" }} primary={'Logout'} />
          </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f6f8" }}>
      <CssBaseline />

      {/* Sidebar / Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e0e0e0",
          },
        }}
        open
      >
        {drawer}
      </Drawer>


      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        {/* AppBar (Top Navigation) */}
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "#ffffff",
            color: "#333",
            boxShadow: "none",
            borderBottom: "1px solid #e0e0e0",
            padding: "5px 0",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              Dashboard
            </Typography>
            <Avatar alt="Admin" src="https://via.placeholder.com/40" />
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, p: 3, mt: '75px', background: '#f9f9f9' }}>{renderSection()}</Box>
      </Box>

      <CountDown date={new Date(expire)} />
    </Box>
  );
};

export default Dashboard;
