set :output, 'log/whenever.log'

set :environment, "development"

every 1.minute do
  rake "reminders:weekly_summary", environment: 'development'
end

  
  