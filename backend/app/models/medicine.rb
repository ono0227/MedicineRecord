class Medicine < ApplicationRecord
    belongs_to :user
    belongs_to :category
    has_many :posts, dependent: :destroy
    mount_uploader :medicine_image, ImageUploader
end
