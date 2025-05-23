FactoryBot.define do
  factory :post do
    ingestion_amount { medicine&.ingestion_amount_every_time || 1 }
    comment { Faker::Lorem.sentence }
    created_at { Faker::Date.backward(days: 30) }
    association :medicine
    association :user, factory: :user
  end
end
