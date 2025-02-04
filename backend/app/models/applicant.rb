require 'supabase'

class Applicant < ApplicationRecord
  belongs_to :job
  has_one_attached :cv, dependent: :destroy

  # Generates a signed URL for the applicant's CV (valid for 1 month)
  def cv_url
    if cv.attached?
      file_name = "cv_#{id}.pdf"
      bucket = "applicant-cvs" # Your private bucket name
  
      # Define your expiration time (1 month = 30 days * 24 hours * 60 minutes * 60 seconds)
      expiration_time = 30 * 24 * 60 * 60 # 1 month in seconds
  
      # Correct way to initialize Supabase::Storage with credentials
      supabase_storage = Supabase::Storage.new(
        url: ENV['SUPABASE_URL'], 
        api_key: ENV['SUPABASE_KEY']
      )
  
      # Check how you should use the `from` method and provide the correct arguments
      signed_url = supabase_storage.from(bucket).signed_url(file_name, expires_in: expiration_time)
  
      signed_url
    else
      ''
    end
  end

  
end
