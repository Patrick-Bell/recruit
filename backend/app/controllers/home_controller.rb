class HomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]

  def index
    file_path = Rails.root.join('public', 'index.html')
    if File.exist?(file_path)
      render file: file_path, layout: false
    else
      render plain: "404 Not Found: index.html not found", status: 404
    end
  end
end
