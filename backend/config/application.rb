require_relative "boot"

require "rails/all"
require 'devise'
require "rails"
require "active_model/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_cable/engine"
require "action_mailer/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_mailbox/engine"
require "action_controller/railtie"
require "rails/test_unit/railtie"
require "propshaft/railtie"  # Add this line



# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.2

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])


    config.load_defaults 6.0
    config.time_zone = "UTC"
    config.active_record.default_timezone = :utc

    config.active_job.queue_adapter = :async




    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
    config.action_dispatch.cookies_same_site_protection = :lax


    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    
  end
end
