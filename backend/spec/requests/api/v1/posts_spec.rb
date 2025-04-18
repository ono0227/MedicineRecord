require 'rails_helper'

RSpec.describe 'Api::V1::Posts', type: :request do
  describe 'GET api/v1/posts/' do
    subject { get(api_v1_posts_path, headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:medicine) { create(:medicine, user: current_user) }

    before do
      create_list(:post, 3, user: current_user, medicine: medicine)
    end

    it '認証ユーザはpostの一覧を確認できる' do
      subject
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(3)
    end

    it '投稿が作成日で降順になっていること' do
      subject
      response_body = JSON.parse(response.body)
      expect(response_body.first['id']).to eq(Post.order(created_at: :desc).first.id)
    end
  end

  describe 'POST api/v1/posts' do
    subject { post(api_v1_posts_path, params: @params, headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:medicine) { create(:medicine, user: current_user) }

    before do
      @params = {
        post: attributes_for(:post).merge(medicine_name: medicine.name, medicine_image: medicine.medicine_image)
      }
    end

    it 'postが作成でき、データベースに保存される' do
      expect { subject }.to change(Post, :count).by(+1)
      expect(response).to have_http_status(:created)
    end
  end

  describe 'PUT api/v1/posts/:id' do
    subject { put(api_v1_post_path(post.id), params: @params, headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:medicine) { create(:medicine, user: current_user) }
    let(:post) { create(:post, user: current_user, medicine: medicine) }
    let(:updated_ingestion_amount) { rand(1..medicine.ingestion_amount_every_time) }
    let(:updated_comment) { Faker::Lorem.sentence }

    before do
      @params = {
        post: {
          ingestion_amount: updated_ingestion_amount,
          comment: updated_comment,
          medicine_name: medicine.name,
          medicine_image: medicine.medicine_image
        }
      }
    end

    it 'postが更新される' do
      subject
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['ingestion_amount']).to eq(updated_ingestion_amount)
      expect(JSON.parse(response.body)['comment']).to eq(updated_comment)
    end
  end

  describe 'DELETE api/v1/posts/:id' do
    subject { delete(api_v1_post_path(post.id), headers: headers) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }
    let(:post) { create(:post, user: current_user, medicine: medicine) }
    let(:medicine) { create(:medicine, user: current_user) }

    it 'postが削除される' do
      post
      expect { subject }.to change(Post, :count).by(-1)
      expect(response).to have_http_status(:ok)
    end
  end
end
