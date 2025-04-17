require 'rails_helper'

RSpec.describe 'Api::V1::Medicines', type: :request do
  # let(:headers) { current_user.create_new_auth_token }
  # let(:current_user) { create(:user) }
  # let(:uploaded_image) { fixture_file_upload(image_path, 'image/png') }
  # let(:medicine) { create(:medicine, user: current_user, category: category) }
  # let(:medicine_id) { medicine.id }
  # let(:category) { create(:category, user: current_user) }

  describe 'GET /api/v1/medicines' do
    subject { get(api_v1_medicines_path, headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:category) { create(:category, user: current_user) }

    before do
      create_list(:medicine, 3, user: current_user, category: category)
    end

    it '認証ユーザはmedicineの一覧を確認できる' do
      subject
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end

  describe 'POST /api/v1/medicines' do
    subject { post(api_v1_medicines_path, headers: headers, params: @params) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:category) { create(:category, user: current_user) }

    before do
      @params = {
        medicine: attributes_for(:medicine).merge(category_name: category.name)
      }
    end

    it 'medicineが作成でき、データベースに保存される' do
      expect { subject }.to change(Medicine, :count).by(1)
      expect(response).to have_http_status(:created)
    end
  end

  describe 'PUT /api/v1/medicines/:id' do
    subject { put(api_v1_medicine_path(medicine.id), headers: headers, params: @params) }

    let(:image_path) { Rails.root.join('spec/fixtures/files/test_medicine.png') }
    # let(:uploaded_image) { fixture_file_upload(image_path, 'image/png') }
    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:category) { create(:category, user: current_user) }
    let(:medicine) { create(:medicine, user: current_user, category: category) }

    before do
      @params = {
        medicine: {
          name: Faker::Lorem.word,
          medicine_image: fixture_file_upload(image_path, 'image/png'),
          memo: Faker::Lorem.sentence,
          unit: %w[g mg 錠 枚 ml].sample,
          ingestion_times_per_day: rand(1..3),
          ingestion_amount_every_time: rand(1..100),
          category_name: category.name
        }
      }
    end

    it 'medicineが更新される' do
      subject
      response_body = JSON.parse(response.body)
      expect(response).to have_http_status(:ok)
      expect(response_body['name']).to eq(@params[:medicine][:name])
      expect(response_body['memo']).to eq(@params[:medicine][:memo])
      expect(response_body['unit']).to eq(@params[:medicine][:unit])
      expect(response_body['ingestion_times_per_day']).to eq(@params[:medicine][:ingestion_times_per_day])
      expect(response_body['ingestion_amount_every_time']).to eq(@params[:medicine][:ingestion_amount_every_time])
      expect(response_body['medicine_image']).to be_present
    end
  end

  describe 'DELETE /api/v1/medicines/:id' do
    subject { delete(api_v1_medicine_path(medicine.id), headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:medicine) { create(:medicine, user: current_user, category: category) }
    let(:category) { create(:category, user: current_user) }

    it 'medicineが削除される' do
      medicine
      expect { subject }.to change(Medicine, :count).by(-1)
      expect(response).to have_http_status(:ok)
    end
  end
end
