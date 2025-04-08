class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, #:rememberable,
         :validatable, :trackable
  include DeviseTokenAuth::Concerns::User

  mount_uploader :image, ImageUploader

  has_many :medicines, dependent: :destroy
  has_many :posts, dependent: :destroy
  has_many :categories, dependent: :destroy

  #レコードがデータベースに保村された後に実行
  after_create :create_default_categories

  private

  #categoriesテーブルにデフォルトのカテゴリー名を作成
  def create_default_categories
    Category.create(user_id: id, name: 'tablet')
    Category.create(user_id: id, name: 'power')
    Category.create(user_id: id, name: 'capsule')
    Category.create(user_id: id, name: 'liquid')
    Category.create(user_id: id, name: 'ointment')
    Category.create(user_id: id, name: 'skin_patch')
    Category.create(user_id: id, name: 'eye_drops')
    Category.create(user_id: id, name: 'nasal_drops')
    Category.create(user_id: id, name: 'ear_drops')
    Category.create(user_id: id, name: 'injection')
  end
end
