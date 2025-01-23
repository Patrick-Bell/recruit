class JobMailer < ApplicationMailer

    def new_job(job)
        @job = job


        mail(to: ENV['EMAIL'], subject: 'New Job')
    end

end
