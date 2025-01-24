import { useState } from "react";
import { Box, Grid, Typography, TextField, FormControl, Select, InputLabel, MenuItem, Divider, InputAdornment, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { toast, Toaster } from "sonner";

const EditJob = ({ job, onBack, handleSubmit, setActiveTab }) => {
  const [formData, setFormData] = useState({
    job_title: job.job_title || "",
    job_type: job.job_type || "",
    job_desc: job.job_desc || "",
    job_hybrid: job.job_hybrid || "",
    job_location: job.job_location || "",
    lower_salary: job.lower_salary || 0,
    higher_salary: job.higher_salary || 0,
    lower_rate: job.lower_rate || 0,
    higher_rate: job.higher_rate || 0,
    contract_determine: job.contract_determine || "",
    contract_length: job.contract_length || "",
    job_skills: job.job_skills || [],
    job_benefits: job.job_benefits || [],
  });

  const addSkill = () => {
    setFormData({ ...formData, job_skills: [...formData.job_skills, ""] });
  };

  // Function to remove a skill field
  const removeSkill = (index) => {
    const updatedSkills = formData.job_skills.filter((_, i) => i !== index);
    setFormData({ ...formData, job_skills: updatedSkills });
  };

  // Function to handle skill input change
  const handleSkillChange = (index, value) => {
    const updatedSkills = formData.job_skills.map((skill, i) => i === index ? value : skill);
    setFormData({ ...formData, job_skills: updatedSkills });
  };
    
  const addBenefit = () => {
    setFormData({ ...formData, job_benefits: [...formData.job_benefits, ""] });
  };

  // Function to remove a skill field
  const removeBenefit = (index) => {
    const updatedBenefits = formData.job_benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, job_benefits: updatedBenefits });
  };

  // Function to handle skill input change
  const handleBenefitChange = (index, value) => {
    const updatedBenefits = formData.job_benefits.map((skill, i) => i === index ? value : skill);
    setFormData({ ...formData, job_benefits: updatedBenefits });
  };


  const submitEdit = (e) => {
    e.preventDefault(); 
    handleSubmit(e, formData); // Now formData is explicitly passed
    toast.success('Success')
  };
  
  

  return (
    <Paper elevation={3} sx={{p:2, mt:2}}>


    <Box sx={{ p: 0 }}>

      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#408663", mb: 3 }}>
        Edit Job Details
      </Typography>

      <form onSubmit={submitEdit}>
        <Grid container spacing={3}>
          {/* Job Title */}
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              variant="outlined"
              fullWidth
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>

          {/* Job Type */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                value={formData.job_type}
                label="Job Type"
                onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
              >
                <MenuItem value="permanent">Permanent</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Job Location */}
          <Grid item xs={12}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              value={formData.job_location}
              onChange={(e) => setFormData({ ...formData, job_location: e.target.value })}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>


          {/* Hybrid/Remote */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Job Model</InputLabel>
              <Select
                value={formData.job_hybrid}
                label="Job Model"
                onChange={(e) => setFormData({ ...formData, job_hybrid: e.target.value })}
              >
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {formData.job_type === 'contract' ? (
            <>
             {/* Hourly Rate */}
          <Grid item xs={6}>
            <TextField
              label="Lower Hourly Rate"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.lower_rate}
              onChange={(e) => setFormData({ ...formData, lower_rate: e.target.value })}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Higher Hourly Rate"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.higher_rate}
              onChange={(e) => setFormData({ ...formData, higher_rate: e.target.value })}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
          {/* Contract Details */}
          <Grid item xs={12}>
            <TextField
              label="Contract Details"
              variant="outlined"
              fullWidth
              value={formData.contract_determine}
              onChange={(e) => setFormData({ ...formData, contract_determine: e.target.value })}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>

          {/* Contract Length */}
          <Grid item xs={12}>
            <TextField
              label="Contract Length"
              variant="outlined"
              fullWidth
              value={formData.contract_length}
              onChange={(e) => setFormData({ ...formData, contract_length: e.target.value })}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
            </>
          ):(
            <>
            {/* Salary Range */}
          <Grid item xs={6}>
            <TextField
              label="Lower Salary"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.lower_salary}
              onChange={(e) => setFormData({ ...formData, lower_salary: e.target.value })}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Higher Salary"
              variant="outlined"
              fullWidth
              type="number"
              value={formData.higher_salary}
              onChange={(e) => setFormData({ ...formData, higher_salary: e.target.value })}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
            </>
          )}

          <Divider />
        

          <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "10px" }}>
            <Typography fontFamily={"Poppins"} fontWeight={800}>
              Skills
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={addSkill}
              startIcon={<AddIcon />}
            >
              Add Skill
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* Render skills input fields */}
          {formData.job_skills.map((skill, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={10} marginTop={"10px"}>
                <TextField
                  label={`Skill ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  sx={{ borderRadius: "10px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <RemoveIcon
                          sx={{ cursor: "pointer" }}
                          color="error"
                          onClick={() => removeSkill(index)}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>


        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "10px" }}>
            <Typography fontFamily={"Poppins"} fontWeight={800}>
              Benefits
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={addBenefit}
              startIcon={<AddIcon />}
            >
              Add Benefit
            </Button>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* Render skills input fields */}
          {formData.job_benefits.map((benefit, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={10} marginTop={"10px"}>
                <TextField
                  label={`Benefit ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  sx={{ borderRadius: "10px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <RemoveIcon
                          sx={{ cursor: "pointer" }}
                          color="error"
                          onClick={() => removeBenefit(index)}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

          {/* Submit Button */}
          <Grid item xs={12} fullWidth sx={{ display: "flex",}}>
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    </Paper>
  );
};

export default EditJob;
