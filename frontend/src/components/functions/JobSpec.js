import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Logo from '../images/new-logo.png';
import { BorderLeft, BorderRight } from '@mui/icons-material';

export const generateJobSpec = (job) => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const sectionGap = 12;
    let yPosition = 20;

    // Add Logo
    doc.addImage(Logo, 'PNG', margin / 2, 7.5, 50, 30); // Adjust width and height as needed
    yPosition += 30;

    // Job Title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text(job.job_title, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += sectionGap;

    // Job Details Table
    const jobDetails = [[
        new Date(job.created_at).toLocaleDateString() || 'Not specified',
        job.job_type || 'Not specified',
        job.job_hybrid || 'Not specified',
        job.job_type === 'contract'
            ? `£${job.lower_rate} - £${job.higher_rate}`
            : `£${job.lower_salary} - £${job.higher_salary}`
    ]];

    doc.autoTable({
        startY: yPosition,
        head: [['Posted', 'Job Type', 'Working Model', job.job_type === 'contract' ? `Rate (${(job.contract_determine)} ir35)` : 'Salary']],
        body: jobDetails,
        theme: 'grid',
        styles: { fontSize: 10, textColor: 'black', cellPadding: 4 },
        headStyles: { fillColor: [64, 134, 99], textColor: [255, 255, 255], fontStyle: 'bold', BorderLeft }, // Custom color
        alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    yPosition = doc.lastAutoTable.finalY + sectionGap;

    // Section Title Helper Function
    const addSectionTitle = (title) => {
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 30, 30);
        doc.text(title, margin, yPosition);
        yPosition += 6;
    };

    // Job Description
    addSectionTitle('Job Description');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const jobDescText = job.job_desc.length > 0 ? job.job_desc.join('\n\n') : 'No description provided.';

    // Calculate height for job description text
    const jobDescDimensions = doc.getTextDimensions(jobDescText, { maxWidth: pageWidth - 2 * margin });
    const jobDescHeight = jobDescDimensions.h;

    // Add job description text to PDF
    doc.text(jobDescText, margin, yPosition, {
        maxWidth: pageWidth - 2 * margin,
        lineHeightFactor: 1.3,
    });

    // Update yPosition after job description based on its height
    yPosition += jobDescHeight + sectionGap + 5;

    // Skills
    addSectionTitle('Required Skills');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(job.job_skills.length > 0 ? job.job_skills.join(', ') : 'No specific skills mentioned.', margin, yPosition, {
        maxWidth: pageWidth - 2 * margin,
    });
    yPosition += sectionGap;

    // Benefits
    addSectionTitle('Benefits');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(job.job_benefits.length > 0 ? job.job_benefits.join(', ') : 'No benefits specified.', margin, yPosition, {
        maxWidth: pageWidth - 2 * margin,
    });
    yPosition += sectionGap;

    // Footer
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(120, 120, 120);
    doc.text(`Fiortech Recruitment Group`, pageWidth / 2, doc.internal.pageSize.height - 12, { align: 'center' });

    // Generate and Open PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const filename = `${job.job_title}-specification.pdf`;
    window.open(pdfUrl, '_blank');
    doc.save(filename);
};
