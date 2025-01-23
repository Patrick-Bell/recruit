class Applicant < ApplicationRecord
    belongs_to :job

    has_one_attached :cv

    def cv_url
        cv.attached? ? Rails.application.routes.url_helpers.rails_blob_url(cv, only_path: true) : ''
      end
   
   
  end
  