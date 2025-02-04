import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Tooltip,
  Link as MuiLink,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'sonner'
import { moveApplicant } from "../routes/ApplicantRoutes";

const Kanban = ({ job, applicants, setApplicants }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const [url, setUrl] = useState('http://localhost:3000');
  
  // Define Kanban stages
  const stages = ["applied", "interviewing", "hired", "rejected"];

  // Organize applicants by stage
  const groupedApplicants = stages.reduce((acc, stage) => {
    acc[stage] = applicants.filter((applicant) => applicant.stage === stage);
    return acc;
  }, {});


  const handleDragStart = (e, applicantId, fromStage) => {
    e.dataTransfer.setData("applicantId", applicantId);
    e.dataTransfer.setData("fromStage", fromStage);
  };

  const handleDrop = async (e, toStage) => {
    const applicantId = e.dataTransfer.getData("applicantId");
    const fromStage = e.dataTransfer.getData("fromStage");

    if (fromStage === toStage) return; // Prevent moving in the same stage

    const updatedApplicants = [...applicants];
    const movedApplicantIndex = updatedApplicants.findIndex(
      (applicant) => applicant.id === parseInt(applicantId)
    );
    const [movedApplicant] = updatedApplicants.splice(movedApplicantIndex, 1);
    movedApplicant.stage = toStage; // Update stage locally

    updatedApplicants.push(movedApplicant); // Reinsert moved applicant
    setApplicants(updatedApplicants);

    console.log('moved', movedApplicant)

    try {
      // Update stage in the backend via API
      await moveApplicant(movedApplicant.id, toStage)
      toast.success(`Applicant ${movedApplicant?.first_name} moved from ${fromStage} to ${toStage}`)
      console.log(`Updated applicant ${movedApplicant.id} to stage ${toStage}`);
    } catch (error) {
      console.error("Error updating applicant stage:", error);

      // Revert UI change if API call fails
      updatedApplicants.splice(updatedApplicants.indexOf(movedApplicant), 1);
      setApplicants([...applicants]); // Revert to original applicants list
    }

    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  const handleViewCandidate = (applicant) => {
    setSelectedApplicant(applicant);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedApplicant(null);
  };

  return (
    <Paper elevation={3} sx={{ mt: 2 }}>
      <Box sx={{ p: 0 }}>
        {/* Kanban Boards Section */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            p: 0,
            mt: 1,
            overflowX: "auto",
            padding: "5px 0 5px 0",
          }}
        >
          {stages.map((stage, index) => (
            <Paper
              key={stage}
              sx={{
                p: 1.5,
                minWidth: 280,
                boxShadow: 2,
                height: 350,
                overflow: "scroll",
              }}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <Typography
                fontWeight="bold"
                textAlign="center"
                sx={{
                  mb: 2,
                  color: "#408663",
                  fontSize: "1.1rem",
                  letterSpacing: 1.1,
                }}
              >
                {stage.toUpperCase()} ({groupedApplicants[stage].length})
              </Typography>

              {groupedApplicants[stage].map((applicant) => (
                <Card
                  key={applicant.id}
                  sx={{
                    mb: 1.5,
                    background: "#ffffff",
                    borderRadius: 2,
                    cursor: "grab", // Indicating that the card is draggable
                    "&:hover": {
                      boxShadow: 6, // Hover effect for better interaction feel
                      transform: "scale(1.02)",
                      transition: "all 0.2s ease-in-out",
                    },
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, applicant.id, stage)}
                >
                  <CardContent sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "#408663", width: 30, height: 30 }}>
                      {applicant.first_name[0]}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography fontWeight="bold" sx={{ fontSize: "1rem" }}>
                        {applicant.first_name} {applicant.last_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {applicant.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {applicant.phone_number}
                      </Typography>
                    </Box>
                  </CardContent>

                  <Divider sx={{ mb: 1 }} />

                  <CardContent sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <Tooltip title="View Candidate">
                      <IconButton size="small" onClick={() => handleViewCandidate(applicant)}>
                        <RemoveRedEyeIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send Email">
                      <IconButton size="small" href={`mailto:${applicant.email}`}>
                        <EmailIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Call">
                      <IconButton size="small" href={`tel:${applicant.phone_number}`}>
                        <PhoneIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    {applicant.profile && (
                      <Tooltip title="LinkedIn Profile">
                        <IconButton size="small">
                          <MuiLink href={applicant.profile} target="_blank">
                            <LinkedInIcon color="info" />
                          </MuiLink>
                        </IconButton>
                      </Tooltip>
                    )}
                    {applicant.cv_url && (
                      <Tooltip title="Download CV">
                        <IconButton size="small">
                          <MuiLink
                            href={`${url}${applicant.cv_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <InsertDriveFileIcon color="success" />
                          </MuiLink>
                        </IconButton>
                      </Tooltip>
                    )}
                    
                  </CardContent>
                </Card>
              ))}
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Hiring Ratios Section */}
<Box sx={{ mt: 3, p: 2, borderRadius: 2 }}>
  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{ p: 2, textAlign: "center", background: "#e3f2fd" }}>
        <Typography variant="h6" color="primary">
          {applicants.length}
        </Typography>
        <Typography variant="body2">Total Applicants</Typography>
      </Paper>
    </Grid>
    
    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{ p: 2, textAlign: "center", background: "#ffecb3" }}>
        <Typography variant="h6" color="secondary">
          {groupedApplicants.interviewing.length} ({Math.round((groupedApplicants.interviewing.length / applicants.length) * 100) || 0}%)
        </Typography>
        <Typography variant="body2">Interview Rate</Typography>
      </Paper>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{ p: 2, textAlign: "center", background: "#c8e6c9" }}>
        <Typography variant="h6" color="success">
          {groupedApplicants.hired.length} ({Math.round((groupedApplicants.hired.length / applicants.length) * 100) || 0}%)
        </Typography>
        <Typography variant="body2">Hired Rate</Typography>
      </Paper>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{ p: 2, textAlign: "center", background: "#ffcdd2" }}>
        <Typography variant="h6" color="error">
          {groupedApplicants.rejected.length} ({Math.round((groupedApplicants.rejected.length / applicants.length) * 100) || 0}%)
        </Typography>
        <Typography variant="body2">Rejection Rate</Typography>
      </Paper>
    </Grid>
  </Grid>
</Box>




      {/* Modal for Candidate Details */}
{selectedApplicant && (
  <Dialog
    fullWidth
    maxWidth="lg"
    open={openModal}
    onClose={handleCloseModal}
    sx={{
      '& .MuiDialogContent-root': {
        padding: '24px',
      },
      '& .MuiDialogTitle-root': {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
      },
    }}
  >
    <DialogTitle sx={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      Candidate Details
    </DialogTitle>
    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c6e49' }}>
        {selectedApplicant.first_name} {selectedApplicant.last_name}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Email:</strong> {selectedApplicant.email}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Phone:</strong> {selectedApplicant.phone_number}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Location:</strong> {selectedApplicant.location}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Availability:</strong> {selectedApplicant.availability}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Profile: </strong>
        <MuiLink href={selectedApplicant.profile} target="_blank">
          LinkedIn
        </MuiLink>
      </Typography>
      <Typography variant="body1" color="textSecondary">
        <strong>Applied:</strong> {new Date(selectedApplicant.created_at).toLocaleString('en-GB')}
      </Typography>

      {selectedApplicant.cover_letter && (
        <Box>
          <Typography variant="body1" color="textSecondary"><strong>Cover Letter:</strong></Typography>
          <Typography>{selectedApplicant.cover_letter}</Typography>

        </Box>
      )}

      {/* CV Preview - Make iframe more dynamic and look better */}
      {selectedApplicant.cv_url ? (
        <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', mt: 2 }}>
          <iframe
            src={`${url}${selectedApplicant.cv_url}`}
            height="500px"
            width="100%"
            title="Candidate CV"
            style={{
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>
      ) : (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          No CV available.
        </Typography>
      )}
    </DialogContent>
    <DialogActions sx={{ paddingBottom: '20px' }}>
      <Button onClick={handleCloseModal} color="primary" variant="contained" size="small">
        Close
      </Button>
    </DialogActions>
  </Dialog>
)}

    </Paper>
  );
};

export default Kanban;
