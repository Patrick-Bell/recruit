class Applicant < ApplicationRecord
    belongs_to :job

    has_one_attached :cv, dependent: :destroy
    before_destroy :purge_cv  # Ensures the file itself is deleted


    def cv_url
        cv.attached? ? Rails.application.routes.url_helpers.rails_blob_url(cv, only_path: true) : ''
      end

      private

      def purge_cv
        cv.purge if cv.attached?  # Deletes the actual file (blob) from storage
      end

   
   
  end
  