require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'create_default_categoriesメソッドに関するテスト' do
    it 'ユーザーが作成された時にデータベースのカテゴリー名カラムが作成されること' do
      user = create(:user)
      expect(user.categories.where(name: 'tablet')).to be_present
      expect(user.categories.where(name: 'powder')).to be_present
      expect(user.categories.where(name: 'capsule')).to be_present
      expect(user.categories.where(name: 'liquid')).to be_present
      expect(user.categories.where(name: 'ointment')).to be_present
      expect(user.categories.where(name: 'skin_patch')).to be_present
      expect(user.categories.where(name: 'eye_drops')).to be_present
      expect(user.categories.where(name: 'nasal_drops')).to be_present
      expect(user.categories.where(name: 'injection')).to be_present
    end
  end
end
