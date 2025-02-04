# app/services/supabase_service.rb
require "active_storage/service"
require "supabase"

class SupabaseService < ActiveStorage::Service::AbstractService
  def initialize(supabase_url:, supabase_key:, bucket:)
    @supabase_url = supabase_url
    @supabase_key = supabase_key
    @bucket = bucket

    # Initialize Supabase client
    @client = Supabase::Client.new(supabase_url, supabase_key)
  end

  def upload(key, io, checksum: nil, **options)
    # Upload file to Supabase storage bucket
    file = io.read
    response = @client.storage.from(@bucket).upload(key, file, { upsert: true })
    
    # Handle success or failure of upload
    if response.error
      raise "Failed to upload file to Supabase: #{response.error.message}"
    end

    # Return file's public URL
    file_url = @client.storage.from(@bucket).get_public_url(key)
    file_url
  end

  def download(key)
    # Download file from Supabase storage bucket
    response = @client.storage.from(@bucket).download(key)
    
    # Handle file download failure
    if response.error
      raise "Failed to download file from Supabase: #{response.error.message}"
    end

    # Return the file's binary content
    response.data
  end

  def delete(key)
    # Delete file from Supabase storage bucket
    response = @client.storage.from(@bucket).remove([key])
    
    # Handle file deletion failure
    if response.error
      raise "Failed to delete file from Supabase: #{response.error.message}"
    end

    true
  end

  def url(key, expires_in:, **options)
    # Generate a signed URL with expiration time
    response = @client.storage.from(@bucket).create_signed_url(key, expires_in)
    
    # Handle URL creation failure
    if response.error
      raise "Failed to generate signed URL: #{response.error.message}"
    end

    # Return signed URL
    response.data[:signed_url]
  end

  def exist?(key)
    # Check if file exists in Supabase storage bucket
    response = @client.storage.from(@bucket).get_metadata(key)
    
    # If response.error is not nil, file doesn't exist
    !response.error
  end
end
