class HomeController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    render file: 'public/index.html', layout: false
  end
end
