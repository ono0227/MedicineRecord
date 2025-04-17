# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# ユーザ毎にcategoriesテーブルにカテゴリー名のデータを投入
User.find_each do |user|
  Category.find_or_create_by(user_id: user.id, name: 'tablet')
  Category.find_or_create_by(user_id: user.id, name: 'powder')
  Category.find_or_create_by(user_id: user.id, name: 'capsule')
  Category.find_or_create_by(user_id: user.id, name: 'liquid')
  Category.find_or_create_by(user_id: user.id, name: 'ointment')
  Category.find_or_create_by(user_id: user.id, name: 'skin_patch')
  Category.find_or_create_by(user_id: user.id, name: 'eye_drops')
  Category.find_or_create_by(user_id: user.id, name: 'nasal_drops')
  Category.find_or_create_by(user_id: user.id, name: 'ear_drops')
  Category.find_or_create_by(user_id: user.id, name: 'injection')
end

Rails.logger.info '既存のユーザーに関連付けて基本的なカテゴリーデータを投入しました。'
