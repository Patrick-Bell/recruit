class SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user!, only: [:create, :destroy]
  skip_before_action :verify_signed_out_user, only: [:destroy]

  include ActionController::Cookies

  JWT_SECRET_KEY = ENV['JWT_SECRET_KEY']

  def create
    user = User.find_by(email: params[:user][:email])

    if user&.valid_password?(params[:user][:password])
      token = JWT.encode({ user_id: user.id, email: user.email, exp: 1.hour.from_now.to_i }, JWT_SECRET_KEY, 'HS256')

      Rails.logger.debug "Generated Token: #{token}"

      cookies[:token] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax,  # Adjust if needed
        expires: 1.hour.from_now,
      }

      render json: { message: 'Login successful', user: user, exp: 1.hour.from_now }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    Rails.logger.debug "Before logout - Cookies: #{cookies.to_hash}"

    cookies.delete(:token)
    cookies.delete(:_session_id)

    Rails.logger.debug "After logout - Cookies: #{cookies.to_hash}"


    head :no_content  # Prevent double render issue
  end

  def current_user
    token = cookies[:token]
    return render json: { authenticated: false, error: "No token found" }, status: :unauthorized if token.blank?

    begin
      decoded_token = JWT.decode(token, JWT_SECRET_KEY, true, { algorithm: 'HS256' })
      user = User.find_by(id: decoded_token[0]['user_id'])

      if user
        render json: { authenticated: true, user: user }
      else
        render json: { authenticated: false, error: "User not found" }, status: :unauthorized
      end
    rescue JWT::ExpiredSignature
      render json: { authenticated: false, error: "Session expired" }, status: :unauthorized
    rescue JWT::DecodeError
      render json: { authenticated: false, error: "Invalid token" }, status: :unauthorized
    end
  end

  def after_sign_out_path_for(_resource_or_scope)
    head :no_content
  end
end
