# frozen_string_literal: true

class LikedItem < ApplicationRecord
  has_many :likes
  has_many :users, through: :likes
end
