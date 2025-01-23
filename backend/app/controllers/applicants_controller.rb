class ApplicantsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]
  before_action :set_applicant, only: %i[ show update destroy ]

  # GET /applicants
  def index
    @applicants = Applicant.all

    render json: @applicants
  end

  # GET /applicants/1
  def show
    render json: @applicant
  end

  # POST /applicants
  def create
    @applicant = Applicant.new(applicant_params)
    Rails.logger.info("Incoming applicant params: #{params.inspect}")

    

    if @applicant.save
      SendApplicationEmailJob.perform_later(@applicant.id)
      render json: @applicant, status: :created, location: @applicant
    else
      render json: @applicant.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /applicants/1
  def update
    if @applicant.update(applicant_params)
      render json: @applicant
    else
      render json: @applicant.errors, status: :unprocessable_entity
    end
  end

  # DELETE /applicants/1
  def destroy
    @applicant.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_applicant
      @applicant = Applicant.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def applicant_params
      params.require(:applicant).permit(:first_name, :last_name, :email, :phone_number, :location, :availability, :profile, :cover_letter, :cv, :job_id, :stage)
    end
end
