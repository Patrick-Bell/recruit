namespace :reminders do
    desc "Send weekly job summary"
    task weekly_summary: :environment do
      Rails.logger.info "Weekly Summary Task Started!"
      WeeklyReportMailer.weekly_summary.deliver_now
      Rails.logger.info "Weekly summary email sent!"
    end
  end
  