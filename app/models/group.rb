class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages

  validates :name, presence: true

  def show_final_message
    if (final_message = messages.last)
      final_message.content? ? final_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end

