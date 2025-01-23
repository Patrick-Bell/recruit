class User < ApplicationRecord
  # Add devise modules you want to use
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable

  # Method to generate JWT token
  def generate_jwt
    payload = { user_id: id, email: email, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end
end
