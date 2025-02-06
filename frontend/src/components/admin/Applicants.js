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
  CircularProgress,
  Menu, MenuItem,
  Divider, 
  Link as MuiLink,
} from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";
import { getCandidates, readMessage, deleteOneCandidate } from "../routes/ApplicantRoutes";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Applicants = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filter, setFilter] = useState("all");
  const [last7DaysCandidates, setLast7DaysCandidates] = useState([]);
  const [candidatesAdded, setCandidatesAdded] = useState(0)
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
    fetchCandidates();
  }, [filter, selectedCandidate, open]);

  const fetchCandidates = async () => {
    try {
      const response = await getCandidates(); 
      
      if (response.status === 401 ){
        window.location.href = '/'
      } else {
      setCandidates(response);
      setLast7DaysCandidates(response.filter(candidate => {
        const candidateDate = new Date(candidate.created_at);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return candidateDate >= sevenDaysAgo;
      
      }));
      setCandidatesAdded(response.filter(candidate => candidate.added_to_system === true || 0))
      setPageLoading(false)
    }} catch (error) {
      console.error("Error fetching candidates:", error);
      if (error.response && error.response.status === 401) {
        window.location.href = '/'; // Redirect to login page
      }
      
    }
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const markAsResponded = async () => {
    if (!selectedCandidate) return;

    try {
      await readMessage(selectedCandidate.id);
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === selectedCandidate.id ? { ...candidate, added_to_system: true } : candidate
        )
      );
      setSelectedCandidate({ ...selectedCandidate, added_to_system: true });
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  // Filter candidates based on filter value
  const filteredCandidates = candidates.filter((candidate) => {
    if (filter === "added") return candidate.added_to_system;
    if (filter === "not_added") return !candidate.added_to_system;
    return true;
  });

  const handleDownload = (candidate) => {
    window.open(candidate.cv_url, "_blank", "noopener,noreferrer");
  };
  

  const handleDelete = async (id) => {
    try {
    await deleteOneCandidate(id)
    setAnchorEl(null)
    setSelectedCandidate(null)
    } catch(e){
      console.log(e)
    }
  }



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
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Candidates</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{candidates.length}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>all time</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Filtered Candidates</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{filteredCandidates.length}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>filtered</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">Recent Candidates</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{last7DaysCandidates.length}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>last 7 days</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography fontFamily={'Poppins'} sx={{ marginBottom: 2 }} color="grey">CV Added</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={800} fontSize={30}>{candidatesAdded.length}</Typography>
              <Box sx={{ display: 'flex', background: 'lightgrey', padding: '5px', borderRadius: '10px' }}>
                <Typography variant="caption" sx={{ marginLeft: '5px' }}>all time</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Candidates Layout with Grid */}
      <Grid container spacing={3}>
        {/* Left Sidebar - Candidate List */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ display: "flex", flexDirection: "column", boxShadow: 2, borderRadius: "10px", maxHeight: '50vh' }}>
            {/* Filter Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={(e, newFilter) => setFilter(newFilter || "all")}
                aria-label="candidate filter"
                size="small"
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="added">Added</ToggleButton>
                <ToggleButton value="not_added">Not Added</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Candidates List with Scroll */}
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              <List>
                {filteredCandidates.map((candidate) => (
                  <ListItem
                    key={candidate.id}
                    button
                    onClick={() => setSelectedCandidate(candidate)}
                    sx={{
                      background: selectedCandidate?.id === candidate.id ? "#f0f0f0" : "white",
                      "&:hover": { background: "#e0e0e0", cursor: 'pointer' },
                    }}
                  >
                    <ListItemIcon>
                      <ArticleIcon color={candidate.added_to_system ? "success" : "error"} />
                    </ListItemIcon>
                    <ListItemText primary={candidate.name} secondary={new Date(candidate.created_at).toLocaleString()} />
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
                        <MenuItem onClick={markAsResponded}>Mark As Added</MenuItem>
                        <MenuItem onClick={() => handleReply(candidate?.email)}>Reply</MenuItem>
                        <MenuItem onClick={() => handleDownload(candidate)}>Download</MenuItem>
                        <Divider />
                        <MenuItem onClick={() => handleDelete(candidate?.id)}>Delete</MenuItem>
                      </Menu>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Right Panel - Selected Candidate */}
        <Grid item xs={12} sm={8}>
          <Paper sx={{ padding: 3, boxShadow: 2, borderRadius: "10px", position: "relative", maxHeight: '70vh' }}>
            {selectedCandidate ? (
              <>
                <Typography variant="h5" fontWeight="bold">
                  Candidate Details
                </Typography>
                <Typography variant="subtitle1" color="gray">
                  From: {selectedCandidate.email} | {selectedCandidate.name}
                </Typography>

                {/* Candidate Details */}
                <Typography variant="subtitle1" color="gray">
                  Phone: {selectedCandidate.phone}
                </Typography>

                <iframe style={{width:'100%', height:'400px', borderRadius:'10px', marginBottom:'30px'}} 
                src={`${selectedCandidate.cv_url.replace("/upload/", "/upload/f_auto,q_auto,w_800/")}.jpg`}>
                </iframe>
              </>
            ) : (
              <Typography variant="subtitle2" color="gray">
                Select a candidate to view their details.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Applicants;
