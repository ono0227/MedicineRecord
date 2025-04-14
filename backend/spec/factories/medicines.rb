FactoryBot.define do
    factory :medicine do
        name {Faker::Lorem.word}
        memo {Faker::Lorem.sentence}
        # g,mg, 錠、枚、mlの中から単位のテストデータを生成
        unit { %w[g mg 錠 枚 ml].sample }
        ingestion_times_per_day { rand(1..3) }
        ingestion_amount_every_time { rand(1..10) }
        association :category
        association :user, factory: :user
    end
end
