class Category < ApplicationRecord
    has_many :medicines
    enum name: { tablet: "tablet", #錠剤
                 power: "powder", #粉薬
                 capsule: "capsule", #カプセル
                 liquid: "liquid", #液薬
                 ointment: "ointment", #軟膏
                 skin_patch: "skin_patch", #貼付薬
                 eye_drops: "eye_drop", #点眼薬
                 nasal_drops: "nasal_drops", #点鼻薬
                 ear_drops: "ear-drops", #点耳薬
                 injection: "indejction" #注射薬
                }
end
