class LikedItemSerializer < ActiveModel::Serializer
  attributes :id, :item_name
  belongs_to :user
end
