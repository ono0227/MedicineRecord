class Category < ApplicationRecord
    has_many :medicines
    belongs_to :user
    # enum :name, %i[tablet power capsule liquid ointment skin_patch eye_drops nasal_drops ear_drops injection]
    #左から順に錠剤、粉薬、カプセル、液薬、軟膏、貼付薬、点眼薬、点鼻薬、点耳薬、注射薬
end
