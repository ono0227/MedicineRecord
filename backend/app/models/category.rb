class Category < ApplicationRecord
  has_many :medicines
  belongs_to :user
end
