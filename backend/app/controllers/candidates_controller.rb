class CandidatesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]
  before_action :set_candidate, only: %i[ show update destroy ]

  # GET /candidates
  def index
    @candidates = Candidate.all

    render json: @candidates.as_json(methods: [:cv_url])
  end

  # GET /candidates/1
  def show
    render json: @candidate
  end

  # POST /candidates
  def create
    @candidate = Candidate.new(candidate_params)

    if @candidate.save
      SendNewCandidateEmailJob.perform_later(@candidate.id)
      render json: @candidate, status: :created, location: @candidate
    else
      render json: @candidate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /candidates/1
  def update
    if @candidate.update(candidate_params)
      render json: @candidate
    else
      render json: @candidate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /candidates/1
  def destroy
    @candidate.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_candidate
      @candidate = Candidate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def candidate_params
      params.require(:candidate).permit(:name, :email, :phone, :cv_file, :added_to_system)
    end
end
