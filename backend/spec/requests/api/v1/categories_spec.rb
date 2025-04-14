require 'rails_helper'

RSpec.describe 'Api::V1::Categories', type: :request do
  describe 'GET /api/v1/categories' do
    subject { get(api_v1_categories_path, headers: headers) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }

    it 'カテゴリーの一覧を取得できる' do
      subject
      expect(response).to have_http_status(:ok)
      response_body = JSON.parse(response.body)

      # レスポンスの内容を検証
      expect(response_body.size).to eq(10)
      expect(response_body[0]['name']).to eq('tablet')
      expect(response_body[1]['name']).to eq('powder')
      expect(response_body[2]['name']).to eq('capsule')
    end
  end
end
