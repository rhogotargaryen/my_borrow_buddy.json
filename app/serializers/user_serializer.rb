class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username
  has_many :liked_items
end
