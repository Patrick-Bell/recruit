namespace :reminders do
  desc "Send weekly job summary"
  task weekly_summary: :environment do
    Rails.logger.info "Weekly Summary Task Started!"
    begin
      WeeklyReportMailer.weekly_summary.deliver_now
      Rails.logger.info "Weekly summary email sent!"
    rescue => e
      Rails.logger.error "Error sending weekly summary email: #{e.message}"
      Rails.logger.error e.backtrace.join("\n")
    end
  end
end
