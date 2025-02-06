class Applicant < ApplicationRecord
  belongs_to :job

  has_one_attached :cv, dependent: :destroy

  def cv_url
    if cv.attached?
      # Use Cloudinary's method to generate the URL
      Cloudinary::Utils.cloudinary_url(cv.key, type: :upload)
    else
      ''
    end
  end
  

  

end
