# app/services/supabase_service.rb
class SupabaseService < ActiveStorage::Service
  def initialize(**options)
    @bucket = options[:bucket]
    @client = Supabase::Storage::Client.new(
      url: ENV['SUPABASE_URL'],
      api_key: ENV['SUPABASE_KEY']
    )
  end

  def upload(key, io, checksum:, content_type:, disposition: nil, filename: nil)
    @client.from(@bucket).upload(key, io.read)
  end

  def url(key, expires_in: 3600)
    @client.from(@bucket).signed_url(key, expires_in)
  end
end
