class WeeklyReportMailer < ApplicationMailer


    def weekly_summary
      @jobs = Job.all
      @permanent_jobs = Job.where(job_type: 'permanent')
      @contract_jobs = Job.where(job_type: 'contract')
  
      # Send the email
      mail(to: ENV['EMAIL'], subject: 'Weekly Job Summary')
    end

    
  end
  