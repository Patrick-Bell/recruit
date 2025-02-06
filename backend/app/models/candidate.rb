class Candidate < ApplicationRecord

    has_one_attached :cv_file

    def cv_url
      if cv_file.attached?
        # Use Cloudinary's method to generate the URL
        Cloudinary::Utils.cloudinary_url(cv_file.key, type: :upload)
      else
        ''
      end
    end


end
