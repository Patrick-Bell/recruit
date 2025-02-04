# app/services/supabase_service.rb
require "aws-sdk-s3"

class SupabaseService < ActiveStorage::Service::S3Service
  def initialize(*args)
    super
  end
end
