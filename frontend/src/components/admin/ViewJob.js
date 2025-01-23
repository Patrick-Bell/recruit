import { Box, Typography, Paper, Divider, Button } from '@mui/material';
import { GrDocumentDownload } from "react-icons/gr";
import { MarginOutlined } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import DeleteJobModal from './DeleteJobModal';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { generateJobSpec } from '../functions/JobSpec';
import {deleteJob} from '../routes/JobsRoutes'
import { GridDeleteIcon } from '@mui/x-data-grid';



const ViewJob = ({ job, onBack }) => {
    const [openModal, setOpenModal] = useState(false);


    const handleDeleteJob = async (job) => {
       
    
        console.log('Attempting to delete job with ID:', job);
    
        try {
            // Make the delete request to the server
            const response = await deleteJob(job);
            onBack()
            toast.success('Job Deleted')

    
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };
    

    
    if (!job) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" color="error">
                    No job details available.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt:2 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#408663' }}>
                    {job.job_title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Job ID:</strong> {job.id}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Posted on:</strong> {new Date(job.created_at).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Open for:</strong> 4 days
                </Typography>
                <Divider sx={{mt:1}}/>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Industry:</strong> {job.industry}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Working Model:</strong> {job.job_hybrid}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Location:</strong> {job.job_location || 'Not specified'}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Skills Required:</strong> {job.job_skills?.join(', ') || 'Not specified'}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Benefits:</strong> {job.job_benefits?.join(', ') || 'Not specified'}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Description:</strong> {job.job_desc || 'Not specified'}
                </Typography>
                <Divider sx={{mt:1}}/>
                {job.job_type === 'contract' ? (
                    <>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Day Rate:</strong> £{job.lower_rate + ' - ' + '£' + job.higher_rate + ' per day' || 'Not specified'}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>IR35 Determination:</strong> {job.contract_determine || 'Not specified'}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Contract Length:</strong> {job.contract_length + ' months' || 'Not specified'}
                </Typography>
                    </>
                ):(
                    <>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Salary:</strong> £{Number(job.lower_salary).toLocaleString() + ' - ' + '£' + Number(job.higher_salary).toLocaleString() + ' per annum' || 'Not specified'}
                </Typography>
                    </>
                )}
            <Divider sx={{mt:1}}/>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    <strong>Applicants:</strong> {job?.applicants?.length || '0'}
                </Typography>

                <Divider sx={{mt:1}}/>

                <Box sx={{ display:'flex', marginTop:'10px' }}>
                <Button endIcon={<GrDocumentDownload />} variant='outlined' onClick={() => generateJobSpec(job)}>Generate Job Spec</Button>
                <Button color='error' sx={{marginLeft:'10px'}} endIcon={<GridDeleteIcon />} variant='outlined' onClick={() => setOpenModal(true)}>Delete Job</Button>
                <Button disabled sx={{marginLeft:'10px'}} endIcon={<GridDeleteIcon />} variant='outlined'>Close Job</Button>
                
                </Box>
                </Paper>

                <DeleteJobModal 
                    open={openModal} 
                    onClose={() => setOpenModal(false)} 
                    onDelete={handleDeleteJob} 
                    jobId={job?.id}
                    job={job}
                />

                <Toaster />


            
        </Box>
    );
};

export default ViewJob;
