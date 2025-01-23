set :output, 'log/whenever.log'

set :environment, "development"

every :monday, at: '18:20 pm' do
    command "echo $RAILS_ENV >> /path/to/your/logs/cron_environment.log"
    rake "reminders:weekly_summary", environment: 'development'
  end
  
  