require "test_helper"

class JobsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @job = jobs(:one)
  end

  test "should get index" do
    get jobs_url, as: :json
    assert_response :success
  end

  test "should create job" do
    assert_difference("Job.count") do
      post jobs_url, params: { job: { active: @job.active, contract_determine: @job.contract_determine, higher_rate: @job.higher_rate, higher_salary: @job.higher_salary, job_benefits: @job.job_benefits, job_close: @job.job_close, job_desc: @job.job_desc, job_hybrid: @job.job_hybrid, job_location: @job.job_location, job_posted: @job.job_posted, job_skills: @job.job_skills, job_title: @job.job_title, job_type: @job.job_type, lower_rate: @job.lower_rate, lower_salary: @job.lower_salary, tag: @job.tag } }, as: :json
    end

    assert_response :created
  end

  test "should show job" do
    get job_url(@job), as: :json
    assert_response :success
  end

  test "should update job" do
    patch job_url(@job), params: { job: { active: @job.active, contract_determine: @job.contract_determine, higher_rate: @job.higher_rate, higher_salary: @job.higher_salary, job_benefits: @job.job_benefits, job_close: @job.job_close, job_desc: @job.job_desc, job_hybrid: @job.job_hybrid, job_location: @job.job_location, job_posted: @job.job_posted, job_skills: @job.job_skills, job_title: @job.job_title, job_type: @job.job_type, lower_rate: @job.lower_rate, lower_salary: @job.lower_salary, tag: @job.tag } }, as: :json
    assert_response :success
  end

  test "should destroy job" do
    assert_difference("Job.count", -1) do
      delete job_url(@job), as: :json
    end

    assert_response :no_content
  end
end
