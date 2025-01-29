import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, CardContent, Typography, Box, Paper, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Chip } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { addReminder, deleteReminders } from "../routes/ReminderRoutes";
import CheckIcon from '@mui/icons-material/Check';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { useAuth } from '../context/AuthContext'
import { StyledBadge } from "./StyledBadge";

const primaryGreen = "#408663";
const lightGreen = "#66A877";
const darkGreen = "#2F6A47";
const grey = "#9E9E9E";
const lightGrey = "#F5F5F5";
const darkGrey = "#616161";
const red = "#F44336";         

const stages = [
  { name: "applied", color: grey },
  { name: "interviewing", color: lightGreen },
  { name: "hired", color: darkGreen },
  { name: "rejected", color: red },
];

const Home = ({ setActiveSection }) => {
  const [jobs, setJobs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [open, setOpen] = useState(false);  
  const [openSummary, setOpenSummary] = useState(false)
  const [hovered, setHovered] = useState(null); // To track hovered reminder index
  const [formData, setFormData] = useState({
    title: '',
    date: ''
  });
  const { expire, logout } = useAuth()

  const handleSubmitSummary = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/send_summary', {}, { withCredentials: true })
      console.log(response.data)
      handleCloseSummary()
    }catch(e){
      console.log(e)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSummary = () => {
    setOpenSummary(true);
  };

  const handleCloseSummary = () => {
    setOpenSummary(false);
  };

  const handleDelete = (reminderId) => {
    const deleteReinder = deleteReminders(reminderId)
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
  };

  const handleSubmit = () => {
    try{
      const response = addReminder(formData);
      handleClose()
      setFormData({
        title: '',
        date: ''
      })
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, messagesRes, candidatesRes, applicantRes, reminderRes] = await Promise.all([
          axios.get("/api/jobs"),
          axios.get("/api/messages"),
          axios.get("/api/candidates"),
          axios.get('/api/applicants'),
          axios.get('/api/reminders')
        ]);

        setJobs(jobsRes.data);
        setMessages(messagesRes.data);
        setCandidates(candidatesRes.data);
        setApplicants(applicantRes.data);
        setReminders(reminderRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [open]);

  const showText = (reminder) => {
    const today = new Date();
    const reminderDate = new Date(reminder.date);
  
    if (reminderDate < today) {
      return { color: 'red', message: 'Deadline Passed' }; // If the reminder is in the past
    } else {
      return { color: 'grey', message: 'Upcoming' }; // If the reminder is in the future
    }
  };

  // Categorize applicants by stage
  const stageCounts = stages.map(({ name, color }) => ({
    name,
    value: applicants?.filter((a) => a.stage === name).length,
    color,
  }));

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h4" fontWeight={800} sx={{ color: darkGrey }}>Welcome back, Aaron</Typography>
              <Box sx={{ display: 'flex', marginRight: '20px', alignItems: 'center' }}>
                <Chip
                  sx={{ color: darkGrey }}
                  label={(new Date()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  icon={<CalendarMonthIcon sx={{ color: darkGrey, marginLeft: '5px' }} />}
                />
              </Box>
            </Box>
            <Typography sx={{ marginBottom: '50px', color: grey }} variant="subtitle1">Welcome to the dashboard, where you can view jobs, applicants and cvs.</Typography>
          </Grid>
          <Grid container spacing={3}>

            {/* Total Stats */}
            <Grid item xs={12}>
              <Divider />
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-evenly' }}>
                <ListItem sx={{ display: "flex", alignItems: "center" }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: primaryGreen, borderRadius: 2 }}>
                      <BusinessIcon sx={{ color: "white" }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Total Jobs" secondary={jobs.length} sx={{ color: grey }} />
                </ListItem>

                {/* Vertical Divider - 50% Height */}
                <Divider orientation="vertical" flexItem sx={{ height: "50px", margin: 'auto auto', mx: 2, borderColor: grey }} />

                <ListItem sx={{ display: "flex", alignItems: "center" }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: primaryGreen, borderRadius: 2 }}>
                      <EmailIcon sx={{ color: "white" }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Messages" secondary={messages.length} sx={{ color: grey }} />
                </ListItem>

                {/* Vertical Divider - 50% Height */}
                <Divider orientation="vertical" flexItem sx={{ height: "50px", margin: 'auto auto', mx: 2, borderColor: grey }} />

                <ListItem sx={{ display: "flex", alignItems: "center" }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: primaryGreen, borderRadius: 2 }}>
                      <PersonIcon sx={{ color: "white" }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Candidates" secondary={candidates.length} sx={{ color: grey }} />
                </ListItem>
              </Box>
              <Divider />
            </Grid>

            {/* Recent Jobs */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, boxShadow: 3, backgroundColor: "white" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: darkGreen }}>Recent Jobs</Typography>
                  <Typography fontWeight={800} sx={{ color: darkGreen }}>{jobs.length}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <List>
                  {jobs
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .slice(0, 3).map((job, index) => (
                    <ListItem key={index} sx={{ "&:hover": { backgroundColor: lightGrey } }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: primaryGreen, borderRadius: 2 }}>
                          <BusinessIcon sx={{ color: "white" }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={job.job_title} secondary={job.job_type} />
                    </ListItem>
                  ))}
                </List>
                <Button onClick={() => setActiveSection('jobs')} sx={{ background: primaryGreen }} fullWidth variant="contained">View All</Button>
              </Paper>
            </Grid>

            {/* Recent Messages */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, boxShadow: 3, backgroundColor: "white" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: darkGreen }}>Recent Messages</Typography>
                  <Typography fontWeight={800} sx={{ color: darkGreen }}>{messages.length}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <List>
                  {messages
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .slice(0, 3).map((message, index) => (
                    <ListItem key={index} sx={{ "&:hover": { backgroundColor: lightGrey } }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: primaryGreen, borderRadius: 2 }}>
                          <EmailIcon sx={{ color: "white" }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={message.name} secondary={message.message} />
                    </ListItem>
                  ))}
                </List>
                <Button onClick={() => setActiveSection('messages')} sx={{ background: primaryGreen }} fullWidth variant="contained">View All</Button>
              </Paper>
            </Grid>

            {/* Recent Candidates */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, boxShadow: 3, backgroundColor: "white" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: darkGreen }}>Recent Candidates</Typography>
                  <Typography fontWeight={800} sx={{ color: darkGreen }}>{candidates.length}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <List>
                  {candidates
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .slice(0, 3).map((candidate, index) => (
                    <ListItem key={index} sx={{ "&:hover": { backgroundColor: lightGrey } }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: primaryGreen, borderRadius: 2 }}>
                          <PersonIcon sx={{ color: "white" }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={candidate.name} secondary={candidate.email} />
                    </ListItem>
                  ))}
                </List>
                <Button onClick={() => setActiveSection('applicants')} sx={{ background: primaryGreen }} fullWidth variant="contained">View All</Button>
              </Paper>
            </Grid>

            {/* Half-Moon Applicants Chart */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, boxShadow: 3, textAlign: "center", backgroundColor: "white" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: darkGreen }}>Applicant Stages</Typography>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie
                      data={stageCounts}
                      cx="50%"
                      cy="100%"
                      startAngle={200}
                      endAngle={0}
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {stageCounts.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  {stageCounts.map(({ name, color }) => (
                    <Box key={name} sx={{ display: "flex", alignItems: "center", mr: 2, flexWrap:'wrap' }}>
                      <Box sx={{ width: 14, height: 14, backgroundColor: color, borderRadius: 1, mr: 1 }} />
                      <Typography variant="caption">{name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column (Welcome Back + Reminders) */}
        <Grid item xs={12} md={4}>
          {/* Welcome Back */}
          <Paper sx={{ padding: 3, boxShadow: 3, mb: 3, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white" }}>

            <StyledBadge overlap='circular'  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot' >
            <Avatar
              alt="Aaron's Profile"
              src="https://media.licdn.com/dms/image/v2/C4D03AQEPJ8VWrDALfg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1637824501437?e=1741824000&v=beta&t=E_pGmlZHPiyR2TSp9QVZZC6snerxj5J3SVnNruUU_Ms"
              sx={{ width: 72, height: 72, mt: 2 }}
            />
            </StyledBadge>
            <Typography variant="subtitle1" sx={{ mt: 1, color: darkGreen }}>
              Aaron O'Callaghan
            </Typography>
            <Typography color={grey} variant="subtitle2">
              Your session will end at {new Date(expire).toLocaleString('en-GB').slice(0, 17)}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <IconButton 
                sx={{ backgroundColor: lightGreen, color: 'black', borderRadius: 2 }} 
                component="a" 
                target="_blank"
                href="https://www.linkedin.com"
              >
                <LinkedIn />
              </IconButton>

              <IconButton 
                sx={{ backgroundColor: lightGreen, color: 'black', borderRadius: 2 }} 
                onClick={handleOpenSummary}
              >
                <SummarizeIcon />
              </IconButton>

              <IconButton 
                sx={{ backgroundColor: lightGreen, color: 'black', borderRadius: 2 }} 
                onClick={logout}
                
              >
                <ExitToAppIcon />
              </IconButton>
            </Box>

          </Paper>

          {/* Reminders */}
          <Card sx={{ backgroundColor: "white", boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Divider sx={{ flexGrow: 1, mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", whiteSpace: "nowrap", color: darkGreen }}>
            Reminders
          </Typography>
          <Divider sx={{ flexGrow: 1, ml: 2 }} />
        </Box>

        <Box sx={{maxHeight:'400px', overflow:'scroll'}}> 
        {reminders.length === 0 && (
          <Typography variant="subtitle1" color="grey">No Reminders Added</Typography>
        )}
        {reminders
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((reminder, i) => (
            <ListItem
              key={i}
              sx={{ "&:hover": { backgroundColor: lightGrey} }}
              onMouseEnter={() => setHovered(i)} // Set hovered reminder on enter
              onMouseLeave={() => setHovered(null)} // Reset hovered reminder on leave
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: grey, borderRadius: 2 }}
                >
                  {/* Conditional rendering: If hovered, show delete icon */}
                  {hovered === i ? (
                    <CheckIcon
                      sx={{ color: 'white', cursor: "pointer" }}
                      onClick={() => handleDelete(reminder.id)} // Handle delete on click
                    />
                  ) : (
                    <NoteAltIcon sx={{ color: "white" }} />
                  )}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={reminder.title}
                secondary={'Deadline: ' + new Date(reminder.date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', year: 'numeric', day: 'numeric' })}
              />
              <Typography variant="subtitle2" color={showText(reminder).color} fontWeight={800}>
                {showText(reminder).message}
              </Typography>
            </ListItem>
          ))}
        </Box>
        <Button sx={{ marginTop: '10px', backgroundColor: primaryGreen }} onClick={handleClickOpen} fullWidth variant="contained">
          Add Reminder
        </Button>
      </CardContent>
    </Card>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Add a Reminder
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <TextField
              label="Reminder"
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ borderRadius: "10px", marginBottom: '20px' }}
            />
            <TextField
              label="Date"
              variant="outlined"
              type="date"
              fullWidth
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              sx={{ borderRadius: "10px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openSummary} onClose={handleCloseSummary}>
        <DialogTitle id="alert-dialog-title">
          Send Job Summary
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
           Clicking <strong>SEND</strong> will send an email that will summarise all currently open job. It will show the job title, whether it's a permanent or contract position,
           its salary/rate and how many applicants the role currently has.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleCloseSummary}>Close</Button>
          <Button variant="contained" autoFocus onClick={handleSubmitSummary}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;