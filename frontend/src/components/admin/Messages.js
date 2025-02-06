import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Divider,
  CircularProgress,
  Menu, MenuItem,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";
import { getMessages, completeMessage, deleteOnemessage } from "../routes/MessageRoutes";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [pageLoading, setPageLoading] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchMessages();
  }, [open]);

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      setPageLoading(false)
      
      // If the response status is 401 (Unauthorized), redirect the user
      if (response.status === 401) {
        window.location.href = '/'; // Redirect to login or homepage
      } else {
        setMessages(response);  // Assuming response.data contains the message data
      }
  
    } catch (error) {
      console.error("Error fetching messages:", error);
      
      // If the error is 401 (Unauthorized), redirect to login page
      if (error.response && error.response.status === 401) {
        window.location.href = '/'; // Redirect to login page
      }
    }
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const markAsResponded = async () => {
    if (!selectedMessage) return;

    try {
      const response = await completeMessage(selectedMessage.id);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === selectedMessage.id ? { ...msg, responded: true } : msg
        )
      );
      setSelectedMessage({ ...selectedMessage, responded: true });

      if (response.status === 401) {
        window.location.href = '/'
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
    await deleteOnemessage(id)
    setAnchorEl(null)
    setSelectedMessage(null)
    } catch(e){
      console.log(e)
    }
  }

  // Compute message statistics
  const totalMessages = messages.length;
  const totalResponded = messages.filter((msg) => msg.responded).length;
  const totalUnresponded = totalMessages - totalResponded;
  const messagesLast7Days = messages.filter(
    (msg) => new Date(msg.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    if (filter === "responded") return msg.responded;
    if (filter === "not_responded") return !msg.responded;
    return true;
  });


  if (pageLoading) {
    return (
      <Box
        sx={{
          height:'100%',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Animated Loading Text */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600, 
            marginBottom: 2, 
            color: "#333",
            fontFamily: "Poppins",
            animation: "fadeIn 1.5s infinite alternate",
          }}
        >
          Loading Job Details...
        </Typography>
  
        {/* Circular Progress Indicator */}
        <CircularProgress 
          size={60} 
          thickness={4} 
        />
  
        {/* Custom CSS Animation for smooth fade effect */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0.4; }
              to { opacity: 1; }
            }
          `}
        </style>
      </Box>
    );
  }



  return (
    <>
      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Messages</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{totalMessages}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>all time</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Responded</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{totalResponded}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>all time</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Not Responded</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{totalUnresponded}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>all time</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Recent Messages</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{messagesLast7Days}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>last 7 days</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Messages Layout with Grid */}
      <Grid container spacing={3}>
        {/* Left Sidebar - Message List */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ display: "flex", flexDirection: "column", boxShadow: 2, borderRadius: "10px", maxHeight:'50vh' }}>
            {/* Filter Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={(e, newFilter) => setFilter(newFilter || "all")}
                aria-label="message filter"
                size="small"
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="responded">Responded</ToggleButton>
                <ToggleButton value="not_responded">Not Responded</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Messages List with Scroll */}
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              <List>
                {filteredMessages.map((msg) => (
                  <ListItem
                    key={msg.id}
                    button
                    onClick={() => setSelectedMessage(msg)}
                    sx={{
                      background: selectedMessage?.id === msg.id ? "#f0f0f0" : "white",
                      "&:hover": { background: "#e0e0e0", cursor: 'pointer' },
                    }}
                  >
                    <ListItemIcon>
                      <MailOutlineIcon color={msg.responded ? "success" : "error"} />
                    </ListItemIcon>
                    <ListItemText primary={msg.name} secondary={new Date(msg.created_at).toLocaleString()} />
                    <Box>
                    <MoreVertIcon onClick={handleClick}/>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={markAsResponded}>Mark as Responded</MenuItem>
                        <MenuItem onClick={() => handleReply(msg.email)}>Reply</MenuItem>
                        <Divider />
                        <MenuItem onClick={() => handleDelete(msg.id)}>Delete</MenuItem>
                      </Menu>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Right Panel - Selected Message */}
        <Grid item xs={12} sm={8}>
  <Paper sx={{ padding: 3, boxShadow: 2, borderRadius: "10px", position: "relative", }}>
    {selectedMessage ? (
      <>
        <Typography variant="h5" fontWeight="bold">
          A New Message...
        </Typography>
        <Typography variant="subtitle1" color="gray">
          From: {selectedMessage.email} | {selectedMessage.name}
        </Typography>
        
        {/* Message Content */}
        <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 10 }}>
          {selectedMessage.message}
        </Typography>

        {/* Buttons Section */}
      </>
    ) : (
      <Typography variant="subtitle2" color="gray">
        Select a message to view.
      </Typography>
    )}
  </Paper>
</Grid>

      </Grid>
    </>
  );
};

export default Messages;
