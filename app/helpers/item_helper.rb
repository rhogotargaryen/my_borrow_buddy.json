# frozen_string_literal: true

module ItemHelper
  def liked_already?(item)
    if LikedItem.find_by(id: item.id).users.include?(current_user)
      true
    else
      false
    end
  end

  def like_count(item)
    a = LikedItem.find_by(id: item.id)
    a.users.count
  end

  def find_like(user, item)
    user.likes.find_by(liked_item_id: item.id)
  end

  def has_rating?(user, item)
    a = find_like(user, item)
    !a.rating.nil?
  end

  def l_item_rating(item)
    a = LikedItem.find_by(id: item.id)
    b = 0
    c = []
    a.likes.map do |x|
      c << b += x.rating unless x.rating.nil?
    end
    if b != 0
      return b / c.length
    else
      return 'currently item is unrated'
    end
  end
end
