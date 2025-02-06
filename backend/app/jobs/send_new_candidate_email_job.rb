# app/jobs/send_new_candidate_email_job.rb
class SendNewCandidateEmailJob < ApplicationJob
  queue_as :default

  def perform(candidate_id)
    candidate = Candidate.find(candidate_id)
    CandidateMailer.new_candidate(candidate).deliver_now
  end
end
