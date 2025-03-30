require "test_helper"

class MedicinesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @medicine = medicines(:one)
  end

  test "should get index" do
    get medicines_url, as: :json
    assert_response :success
  end

  test "should create medicine" do
    assert_difference("Medicine.count") do
      post medicines_url, params: { medicine: { ingestion_amount_per_day: @medicine.ingestion_amount_per_day, ingestion_times_per_day: @medicine.ingestion_times_per_day, medicine_image: @medicine.medicine_image, memo: @medicine.memo, name: @medicine.name } }, as: :json
    end

    assert_response :created
  end

  test "should show medicine" do
    get medicine_url(@medicine), as: :json
    assert_response :success
  end

  test "should update medicine" do
    patch medicine_url(@medicine), params: { medicine: { ingestion_amount_per_day: @medicine.ingestion_amount_per_day, ingestion_times_per_day: @medicine.ingestion_times_per_day, medicine_image: @medicine.medicine_image, memo: @medicine.memo, name: @medicine.name } }, as: :json
    assert_response :success
  end

  test "should destroy medicine" do
    assert_difference("Medicine.count", -1) do
      delete medicine_url(@medicine), as: :json
    end

    assert_response :no_content
  end
end
