class Applicant < ApplicationRecord
    belongs_to :job

    has_one_attached :cv, dependent: :destroy


    def cv_url
      cv.attached? ? Rails.application.routes.url_helpers.rails_blob_path(cv, only_path: true) : ''
    end
    

      private

   
   
   
  end
  