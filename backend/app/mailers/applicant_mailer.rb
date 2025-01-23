class ApplicantMailer < ApplicationMailer
    include Rails.application.routes.url_helpers


    def new_applicant(applicant)
      @applicant = applicant
      @job = Job.find(@applicant.job_id) # Fetch the job details as well if needed

      # Attach the CV if it exists
      if @applicant.cv.present?
        # Attach the file (it can be a PDF, DOC, DOCX, etc.)
        attachments[@applicant.cv.filename.to_s] = @applicant.cv.download
      end
  
      # Send the email
      mail(to: ENV['EMAIL'], subject: "New Applicant") do |format|
        format.html { render 'new_applicant' } # Your HTML email template
        format.text { render plain: 'New applicant information' }
      end
  
      
    end
  end
  