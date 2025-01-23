class CandidateMailer < ApplicationMailer

        include Rails.application.routes.url_helpers

        def new_candidate(candidate)
          @candidate = candidate
    
          # Attach the CV if it exists
          if @candidate.cv_file.present?
            # Attach the file (it can be a PDF, DOC, DOCX, etc.)
            attachments[@candidate.cv_file.filename.to_s] = @candidate.cv_file.download
          end
      
          # Send the email
          mail(to: ENV['EMAIL'], subject: "New CV Uploaded") do |format|
            format.html { render 'new_candidate' } # Your HTML email template
            format.text { render plain: 'New candidate uploaded CV' }
          end
      
          
        end      
end
