import { Typography, Box, Button, Grid, Divider, } from "@mui/material";

import Underline from "../../animation/Underline";


const JobDescription = ({ job, setValue }) => {

  const handleClick = () => {
    setValue(1)
    window.scrollTo({top: 500})
  }


    return (

        <Box sx={{display:'flex'}}>
        <Grid container spacing={2}>
          {/* Left Panel: Job Info */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ border: '1px solid #f9f9f9', padding: '10px 20px', borderRadius:'10px', margin:'5px' }}>
              {/* Job Title Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography fontFamily={'Poppins'}>Job Title</Typography>
                <Typography fontFamily={'Poppins'}><strong>{job?.job_title}</strong></Typography>
              </Box>
  
              {/* Job Type and Location Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography fontFamily={'Poppins'}>Job Type</Typography>
                <Typography fontFamily={'Poppins'}><strong>{job?.job_type?.charAt(0).toUpperCase() + job?.job_type?.slice(1)}</strong></Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography fontFamily={'Poppins'}>Location</Typography>
                <Typography fontFamily={'Poppins'}><strong>{job?.job_location}</strong></Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography fontFamily={'Poppins'}>Working Model</Typography>
                <Typography fontFamily={'Poppins'}><strong>{job?.job_hybrid?.charAt(0).toUpperCase() + job?.job_hybrid?.slice(1)}</strong></Typography>
              </Box>
  
              {/* Salary / Rate Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography>{job?.job_type === "contract" ? "Rate" : "Salary"}</Typography>
                <Typography fontFamily={'Poppins'}>
                  <strong>{job?.job_type === "contract" 
                    ? `£${job?.lower_rate} - £${job?.higher_rate} per day` 
                    : `£${Number(job?.lower_salary).toLocaleString()} - £${Number(job?.higher_salary).toLocaleString()} per annum`}</strong>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography fontFamily={'Poppins'}>Sector</Typography>
                <Typography fontFamily={'Poppins'}><strong>Technology</strong></Typography>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography fontFamily={'Poppins'}>Apply</Typography>
                <Typography onClick={() => setValue(1)} sx={{"&:hover": {color:'#408663', cursor:'pointer'}}} fontFamily={'Poppins'}><strong>Click here</strong></Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                <Typography fontFamily={'Poppins'}>Back To Jobs</Typography>
                <Typography component={'a'} href="/jobs" sx={{textDecoration:'none', color:'black', "&:hover": {color:'#408663', cursor:'pointer'}}} fontFamily={'Poppins'}><strong>Click here</strong></Typography>
              </Box>
            </Box>
          </Grid>
  
          {/* Right Panel: Job Description or Details */}
          <Grid item xs={12} sm={8}>
            <Box sx={{ padding: '10px', marginLeft: '20px' }}>
              <Typography variant="h4" fontFamily="Poppins" fontWeight="600">Job Description</Typography>
              {job?.job_desc.map((p, i) => (
                <Typography fontFamily={'Poppins'} sx={{marginTop:'10px', lineHeight:'30px'}}>{p}</Typography>
              ))}
            </Box>

            <Box sx={{ padding: '10px', marginLeft: '20px' }}>
              <Typography variant="h4" fontFamily="Poppins" fontWeight="600">Skills</Typography>
              <Box>
                {job?.job_skills.map((skill, i) => (
                <Box sx={{display:'flex', alignItems:'center'}}>
                <Box sx={{height:'10px', width:'10px', background:'#408663', transform:'rotate(45deg)'}}></Box>
                <Typography key={i} sx={{lineHeight:'40px', marginLeft:'10px'}} fontFamily={'Poppins'}>{skill}</Typography>
                </Box>
                ))}
              </Box>
            </Box>


            {job.job_benefits.length > 0 && (
              <Box sx={{ padding: '10px', marginLeft: '20px' }}>
              <Typography variant="h4" fontFamily="Poppins" fontWeight="600">Benefits</Typography>
              <Box>
                {job?.job_benefits.map((benefit, i) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} key={i}>
                    <Box sx={{ height: '10px', width: '10px', background: '#408663', transform: 'rotate(45deg)', marginRight: '20px' }}></Box>
                    <Typography sx={{ lineHeight: '30px', wordBreak: 'break-word' }} fontFamily="Poppins">
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            )}

              <Box sx={{marginLeft:'20px', padding:'10px'}}>
              <Typography >
                If you are a passionate and excited to work in the <strong>{job?.industry}</strong> industry, we would love to hear from you!
              </Typography>
              </Box>

          
            

            <Box fullWidth sx={{margin:'20px 10px 0 10px'}}>
            <Button fullWidth onClick={() => handleClick()} variant="contained">Apply</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>


    )
}


export default JobDescription