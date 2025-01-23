class Candidate < ApplicationRecord

    has_one_attached :cv_file

    def cv_url
        cv_file.attached? ? Rails.application.routes.url_helpers.rails_blob_url(cv_file, only_path: true) : ''
      end


end
