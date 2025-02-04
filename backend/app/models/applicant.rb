class Applicant < ApplicationRecord
  belongs_to :job

  has_one_attached :cv, dependent: :destroy

  # You could store the URL directly in your model (if needed)
  def cv_url
    if cv.attached?
      # Use the original filename or path for direct access
      bucket = "applicant-cvs"  # Your private bucket name
      file_name = "cv_#{id}.pdf"  # Your unique file identifier

      # Construct the public URL or any other way to access the file
      # If the bucket is private, you would need to use Supabase storage URL.
      supabase_url = ENV['SUPABASE_URL']  # Ensure this is set in your environment
      public_url = "#{supabase_url}/storage/v1/object/#{bucket}/#{file_name}"

      # Return the permanent URL (not signed)
      public_url
    else
      ''
    end
  end
end
