class Medicine < ApplicationRecord
    belongs_to :user, :category
    has_many :posts, dependent: :destroy
    mount_uploader :medicine_image, ImageUploader
end
