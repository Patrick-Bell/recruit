// so I thibk I need to put all editing/deleteing toasts tstuff on jobDetails as it linkns to all 3 pages
// then I need to link findJobs from this page to job details so thigns can be updated automatically


// tomrorow/this week - ensure toasts work
// start building log in page for admin
// look at devise gem
// start doing some emails
// do some more functions like close job then change jobs to liveJobs or something so closed ones do not show
// add some good statistics squares
// maybe deploy it for tesitng and showing
// messages page I want to look like a gmail thing scroll on the left message on the right like gmail
// applicant page can be similar to the email page layout


import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchJobs, deleteJob } from "../routes/JobsRoutes";
import JobDetails from "./JobDetails";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const AllJobs = ({  }) => {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [activeTab, setActiveTab] = useState("viewJobDetails"); // Default active tab
  const [loading, setLoading] = useState(false)


  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

   // Handle Delete Action
   const handleDelete = async (row) => {
    try { 
      const response = await deleteJob(row.id)
      console.log(response)
    }catch(e){
      console.log(e)
    }
  };


  const findJobs = async () => {
    setLoading(true)
    console.log(activeTab)
    try {
    const response = await fetchJobs()
    console.log(response, 'refresh')
    setJobs(response)
    setLoading(false)
  }catch(e) {
    console.log(e)
  }
  }

  useEffect(() => {
    findJobs()
  }, [activeTab, selectedJob])



  const columns = [
    {
      field: "job_title",
      headerName: "Job Title",
      flex: 2,
      sortable: false, // Disable sorting arrows
    },
    {
      field: "job_type",
      headerName: "Job Type",
      flex: 1,
      sortable: false, // Disable sorting arrows
      renderCell: (params) => {
        const label = <Chip label={params.value}></Chip>
        return label
      } 
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => {
        const formattedDate = new Date(params.value).toLocaleDateString('en-GB')
        return formattedDate
      }
    },
    {
      field: "applicants",
      headerName: "Applicants",
      type:'number',
      sortable:false,
      flex: 1,
      renderCell: (params) => {
        const totalApplicants = Number(params.row?.applicants?.length)
        return totalApplicants
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => setSelectedJob(params.row)}
          >
            View
          </Button>
        </Box>
      ),
    },
  ];



  return (
    <Box>
      {selectedJob ? (
        <>
        <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} findJobs={findJobs} handleTabChange={handleTabChange} setActiveTab={setActiveTab} activeTab={activeTab} />
        </>
      ):(
        <>
        <Paper elevation={3} sx={{p: 2, mb:2}}>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <Typography fontWeight={800} fontFamily={'Poppins'}>Job Page</Typography>
          </Box>
        </Paper>
      
      <Grid container spacing={3}>
        {/* Left Section for Table */}
        <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 2, height: 400, overflow: 'auto' }}>
  <DataGrid
    rows={jobs}
    columns={columns}
    autoHeight={false} // Prevent auto height to allow scrolling
    sx={{
      height: "100%", // Fill container
      width: '100%',
    }}
    disableRowSelectionOnClick
    disableSelectionOnClick
    initialState={{
      pagination: {
        paginationModel: {
          pageSize: 5,
        },
      },
    }}
    pageSizeOptions={[5, 10, 20]}
  />
</Paper>
        </Grid>
        {/* Right Section for 3 Vertical Boxes */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2,}}>
                <Typography fontFamily={'Poppins'} sx={{marginBottom:3}} color="grey">Applicants</Typography>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <Typography fontWeight={800} fontSize={30}>{Number(30000).toLocaleString()}</Typography>
                  <Box sx={{display:'flex', background:'lightgrey', padding:'5px', borderRadius:'10px'}}>
                    <Typography variant="caption" sx={{marginLeft:'5px'}}>last 7 days</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2,}}>
                <Typography fontFamily={'Poppins'} sx={{marginBottom:3}} color="grey">Permanent Jobs</Typography>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <Typography fontWeight={800} fontSize={30}>{Number(30000).toLocaleString()}</Typography>
                  <Box sx={{display:'flex', background:'lightgrey', padding:'5px', borderRadius:'10px'}}>
                    <Typography variant="caption" sx={{marginLeft:'5px'}}>last 7 days</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2,}}>
                <Typography fontFamily={'Poppins'} sx={{marginBottom:3}} color="grey">New Jobs</Typography>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <Typography fontWeight={800} fontSize={30}>{Number(30000).toLocaleString()}</Typography>
                  <Box sx={{display:'flex', background:'lightgrey', padding:'5px', borderRadius:'10px'}}>
                    <Typography variant="caption" sx={{marginLeft:'5px'}}>last 7 days</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>


          </Grid>
        </Grid>
      </Grid>
      </>
       )}
    </Box>
  );
};

export default AllJobs;
