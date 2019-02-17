FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/app/assets/images/AI PLANET.jpg")
    user
    group
  end
end
