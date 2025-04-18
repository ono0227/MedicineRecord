class Post < ApplicationRecord
  belongs_to :medicine
  belongs_to :user

  validate :ingestion_amount_is_valid
  validate :total_ingestion_count_is_valid

  private

  def ingestion_amount_is_valid
    return if validate_ingestion_amount(medicine, ingestion_amount)

    errors.add(:ingestion_amount, '摂取量が1回あたりの推奨量を超えています')
  end

  def total_ingestion_count_is_valid
    return if validate_total_ingestion_count(medicine, id)

    errors.add(:base, '1日の投稿回数が1日の推奨服薬回数を超えています')
  end

  # 服薬量と1回の推奨摂取量の大小を比較
  def validate_ingestion_amount(medicine, ingestion_amount)
    ingestion_everytime = medicine.ingestion_amount_every_time
    ingestion_amount.to_i <= ingestion_everytime.to_i
  end

  # 1日の投稿回数と1日の推奨服薬回数の大小を比較
  def validate_total_ingestion_count(medicine, current_post_id = nil)
    today = Time.zone.today
    total_ingestion_count = user.posts
                                .where(medicine_id: medicine.id)
                                .where('DATE(created_at) = ?', today) # 投稿日とタイムゾーンの日付は合致しているか
                                .where.not(id: current_post_id) # 更新時に重複加算されることを防止するため
                                .count

    max_ingestion_count = medicine.ingestion_times_per_day

    total_ingestion_count < max_ingestion_count
  end
end
