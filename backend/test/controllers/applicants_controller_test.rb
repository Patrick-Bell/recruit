require "test_helper"

class ApplicantsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @applicant = applicants(:one)
  end

  test "should get index" do
    get applicants_url, as: :json
    assert_response :success
  end

  test "should create applicant" do
    assert_difference("Applicant.count") do
      post applicants_url, params: { applicant: { availability: @applicant.availability, cover_letter: @applicant.cover_letter, email: @applicant.email, first_name: @applicant.first_name, last_name: @applicant.last_name, location: @applicant.location, phone_number: @applicant.phone_number, profile: @applicant.profile } }, as: :json
    end

    assert_response :created
  end

  test "should show applicant" do
    get applicant_url(@applicant), as: :json
    assert_response :success
  end

  test "should update applicant" do
    patch applicant_url(@applicant), params: { applicant: { availability: @applicant.availability, cover_letter: @applicant.cover_letter, email: @applicant.email, first_name: @applicant.first_name, last_name: @applicant.last_name, location: @applicant.location, phone_number: @applicant.phone_number, profile: @applicant.profile } }, as: :json
    assert_response :success
  end

  test "should destroy applicant" do
    assert_difference("Applicant.count", -1) do
      delete applicant_url(@applicant), as: :json
    end

    assert_response :no_content
  end
end
