import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import EditJob from "./EditJob"; // Your EditJob component
import Kanban from "./Kanban"; // Your ViewApplicants component
import ViewJob from "./ViewJob"; // Your ViewJob component
import { Toaster , toast} from "sonner";
import axios from "axios";


const JobDetails = ({ job, onBack, activeTab, handleTabChange, setActiveTab }) => {
  const [applicants, setApplicants] = useState(job.applicants || []);



  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    console.log(job?.id)
    const response = await axios.put(`/api/jobs/${job?.id}`, formData)
    toast.success('Job Updated!')
    onBack()
  };



  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#408663" }}>
            {job.job_title}
          </Typography>
          <Button variant="outlined" size="small" onClick={onBack}>Back</Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        {/* Intro Section with Tab Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
        <Button
          variant={activeTab === "viewJobDetails" ? "contained" : "outlined"} // Active tab styled as contained
          onClick={() => handleTabChange("viewJobDetails")}
          sx={{ flexGrow: 1, m: 1 }}
        >
          View Job Details
        </Button>
        <Button
          variant={activeTab === "editJob" ? "contained" : "outlined"} // Active tab styled as contained
          onClick={() => handleTabChange("editJob")}
          sx={{ flexGrow: 1, m: 1 }}
        >
          Edit Job
        </Button>
        <Button
          variant={activeTab === "viewApplicants" ? "contained" : "outlined"} // Active tab styled as contained
          onClick={() => handleTabChange("viewApplicants")}
          sx={{ flexGrow: 1, m: 1 }}
        >
          View Applicants
        </Button>
        <Button
        variant="outlined"
          onClick={onBack}
          sx={{ flexGrow: 1, m: 1 }}
        >
          Back to Jobs
        </Button>
      </Box>
      </Paper>

      <Toaster />

      

      {/* Dynamic Content based on selected tab */}
      {activeTab === "viewJobDetails" && (
        <ViewJob job={job} onBack={onBack} />
      )}

      {activeTab === "editJob" && (
        <EditJob job={job} onBack={onBack} handleSubmit={handleSubmit} setActiveTab={setActiveTab} />
      )}

      {activeTab === "viewApplicants" && (
        <Kanban applicants={applicants} job={job} setApplicants={setApplicants} />
      )}
    </Box>
  );
};

export default JobDetails;
