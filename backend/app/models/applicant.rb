require 'supabase'

class Applicant < ApplicationRecord
  belongs_to :job
  has_one_attached :cv, dependent: :destroy

  # Generates a signed URL for the applicant's CV (valid for 1 month)
  def cv_url
    if cv.attached?
      file_name = "cv_#{id}.pdf"
      bucket = "applicant-cvs"
  
      expiration_time = 30 * 24 * 60 * 60 # 1 month in seconds
  
      # Initialize Supabase client
      supabase = Supabase::Client.new(
        ENV['SUPABASE_URL'],
        ENV['SUPABASE_KEY']
      )
  
      # Access storage
      storage = supabase.storage
  
      # Generate signed URL
      signed_url = storage.from(bucket).create_signed_url(file_name, expiration_time)
  
      signed_url
    else
      ''
    end
  end
  

  
end
