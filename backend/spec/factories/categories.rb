FactoryBot.define do
  factory :category do
    # 錠剤、粉薬、カプセル、液薬、軟膏、貼付剤、点眼薬、点鼻薬、点耳薬、注射剤の中からカテゴリーの名前を生成
    name { %w[tablet powder capsule liquid ointment skin_patch eye_drops nasal_drops ear_drops injection].sample }
    association :user, factory: :user
  end
end
