# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

 Rails.application.config.middleware.insert_before 0, Rack::Cors do
   allow do
     origins "http://localhost:3001"

     resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
   end

   allow do
    origins 'https://recruit-xicp.onrender.com'  # For production frontend

    resource "/rails/active_storage/*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end

  allow do
    origins 'https://quick-test-be09400107a2.herokuapp.com'  # For production frontend

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end


 end
