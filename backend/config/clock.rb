require_relative '../config/environment' # Load the Rails environment
require 'clockwork'
include Clockwork

handler do |job|
  Rails.logger.info "Running scheduled job: #{job}"
  WeeklyReportMailer.weekly_summary.deliver_now
end

# Run every Monday at 12 PM (noon)
every(1.week, 'weekly_summary.send', at: '12:00') { |job|
  if Time.now.monday? # Check if today is Monday
    Rails.logger.info "Triggering job for Monday at 12 PM"
    WeeklyReportMailer.weekly_summary.deliver_now
  end
}
