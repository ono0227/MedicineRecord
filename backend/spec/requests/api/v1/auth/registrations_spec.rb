require 'rails_helper'

RSpec.describe 'Api::V1::Auth::Registrations', type: :request do
  let(:headers) { current_user.create_new_auth_token }
  let(:current_user) { create(:user, :guest) }

  describe 'PUT /api/v1/auth' do
    let(:params) do
      {
        name: 'Updated Name',
        email: 'updated@example.com'
      }
    end

    subject { put(api_v1_user_registration_path, headers: headers, params: params) }

    it 'ゲストユーザーはアカウント情報を更新できない' do
      subject
      expect(response).to have_http_status(:forbidden)
      expect(JSON.parse(response.body)['error']).to eq('ゲストユーザーはアカウント情報を変更できません。')
    end
  end

  describe 'DELETE /api/v1/auth' do
    subject { delete(api_v1_user_registration_path, headers: headers) }

    it 'ゲストユーザーはアカウントを削除できない' do
      subject
      expect(response).to have_http_status(:forbidden)
      expect(JSON.parse(response.body)['error']).to eq('ゲストユーザーはアカウント情報を変更できません。')
    end
  end
end
