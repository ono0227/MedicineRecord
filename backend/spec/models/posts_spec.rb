require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:user) { create(:user) }
  let(:medicine) { create(:medicine, user: user, ingestion_amount_every_time: 2, ingestion_times_per_day: 3) }

  describe '#validate_ingestion_amount' do
    context '摂取量が推奨量以下の場合' do
      let(:post) { build(:post, user: user, medicine: medicine, ingestion_amount: 1) }

      it 'trueを返すこと' do
        expect(post.send(:validate_ingestion_amount, medicine, 1)).to be_truthy
      end
    end

    context '摂取量が推奨量を超える場合' do
      let(:post) { build(:post, user: user, medicine: medicine, ingestion_amount: 3) }

      it 'falseを返すこと' do
        expect(post.send(:validate_ingestion_amount, medicine, 3)).to be_falsey
      end
    end
  end

  describe '#validate_total_ingestion_count' do
    context '1日の投稿回数が推奨回数未満の場合' do
      let(:post) { build(:post, user: user, medicine: medicine, created_at: Time.zone.today) }

      it 'trueを返すこと' do
        expect(post.send(:validate_total_ingestion_count, medicine)).to be_truthy
      end
    end

    context '1日の投稿回数が推奨回数以上の場合' do
      before do
        create(:post, user: user, medicine: medicine, created_at: Time.zone.today)
        create(:post, user: user, medicine: medicine, created_at: Time.zone.today)
        create(:post, user: user, medicine: medicine, created_at: Time.zone.today)
      end

      let(:post) { build(:post, user: user, medicine: medicine, created_at: Time.zone.today) }

      it 'falseを返すこと' do
        expect(post.send(:validate_total_ingestion_count, medicine)).to be_falsey
      end
    end
  end
end
