# app/jobs/send_application_email_job.rb
class SendApplicationEmailJob < ApplicationJob
  queue_as :default

  def perform(applicant_id)
    applicant = Applicant.find(applicant_id)
    ApplicantMailer.new_applicant(applicant).deliver_now
  end
end
