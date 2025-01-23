class JobsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]
  before_action :set_job, only: %i[ show update destroy ]


  def index
    @jobs = Job.includes(:applicants).all
  
    render json: @jobs.as_json(include: {
      applicants: {
        methods: [:cv_url]  # Fetch the CV URL for each applicant
      }
    })
  end
  
  

  # GET /jobs/1
  def show

    render json: @job.as_json(include: {
      applicants: {
        methods: [:cv_url]
      }
    })
  end

  # POST /jobs
  def create
    @job = Job.new(job_params)

    if @job.save
      JobMailer.new_job(@job).deliver_now
      render json: @job, status: :created, location: @job
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /jobs/1
  def update
    if @job.update(job_params)
      render json: @job
    else
      render json: @job.errors, status: :unprocessable_entity
    end
  end

  # DELETE /jobs/1
  def destroy
    @job.destroy!
  end



  #custom routes
  def recent_jobs
    @jobs = Job.where(created_at: 7.days.ago..Time.current)
    render json: @jobs, status: :ok
  end
  


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_job
      @job = Job.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def job_params
      params.require(:job).permit(
        :job_title, :job_type, :lower_salary, :higher_salary,
        :lower_rate, :higher_rate, :contract_determine, :job_location,
        :job_hybrid, :tag, :job_posted, :job_close, :active,
        :contract_length, :industry,
        job_skills: [], job_benefits: [], job_desc: []  # Correctly permitting these as arrays
      )
    end
    
end
