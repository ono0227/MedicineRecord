CarrierWave.configure do |config|
  if Rails.env.development? || Rails.env.test?
    config.storage = :file
  elsif Rails.env.production?
    config.storage = :fog
    config.fog_provider = 'AWS'
    config.fog_credentials = {
      provider: 'AWS',
      region: ENV['AWS_REGION']
    }
    config.fog_directory  = ENV['AWS_S3_BUCKET_NAME']
    config.fog_public     = false
    config.fog_attributes = { 'Cache-Control' => "max-age=#{365.days.to_i}" }
  end
end
