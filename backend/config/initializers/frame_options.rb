# config/initializers/frame_options.rb
Rails.application.config.action_dispatch.default_headers = {
  'X-Frame-Options' => 'ALLOWALL'  # Allows embedding from any domain
}
