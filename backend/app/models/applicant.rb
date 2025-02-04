require 'supabase'

class Applicant < ApplicationRecord
  belongs_to :job
  has_one_attached :cv, dependent: :destroy

  # Generates a signed URL for the applicant's CV (valid for 1 month)
  def cv_url
    return '' unless cv.attached?

    file_name = "cv_#{id}.pdf"
    bucket = ENV['SUPABASE_BUCKET'] || "applicant-cvs" # Use ENV variable if available
    expiration_time = 30 * 24 * 60 * 60 # 1 month in seconds

    # Initialize Supabase client
    supabase = Supabase::Client.new(ENV['SUPABASE_URL'], ENV['SUPABASE_KEY'])
    
    # Get storage service
    storage = supabase.storage

    # Generate signed URL
    response = storage.from(bucket).create_signed_url(file_name, expiration_time)

    # Return signed URL if request is successful
    response['signedURL'] ? "#{ENV['SUPABASE_URL']}/storage/v1#{response['signedURL']}" : ''
  end
end
