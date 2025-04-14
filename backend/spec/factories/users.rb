FactoryBot.define do
    factory :user do
      name {Faker::Name.name}
      email {Faker::Internet.unique.email}
      password {Faker::Internet.password(min_length: 12)}
      password_confirmation {password}

      #ゲストユーザに関するテストをする場合
      trait :guest do
        #@example.comを共通部分に持つ一意のテストメールアドレスを作成
        sequence(:email) {|n| "#{Faker::Lorem.characters(number: 8)}_#{n}@example.com"}
      end
    end
end
