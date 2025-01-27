class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  private

  JWT_SECRET_KEY = ENV['JWT_SECRET_KEY']

  def authenticate_user!
    Rails.logger.info "authenticate_user! is being called"
    
    # Retrieve the token from cookies
    token = cookies[:token]
    Rails.logger.info "Token from cookies: #{token}"

    if token.present?
      begin
        # Decode the token (JWT.decode returns an array, so get the first element)
        payload, _header = JWT.decode(token, JWT_SECRET_KEY, true, algorithm: 'HS256')

        Rails.logger.info "Decoded payload: #{payload.inspect}"  # Log the decoded payload

        if payload && payload["user_id"]
          @current_user = User.find(payload["user_id"])
        else
          render json: { error: "Invalid token" }, status: :unauthorized
        end
      rescue JWT::DecodeError => e
        Rails.logger.error "JWT Decode Error: #{e.message}"
        render json: { error: "Invalid token" }, status: :unauthorized
      end
    else
      render json: { error: "Token missing" }, status: :unauthorized
    end
  end
end
