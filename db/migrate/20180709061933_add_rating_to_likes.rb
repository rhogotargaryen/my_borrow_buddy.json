# frozen_string_literal: true

class AddRatingToLikes < ActiveRecord::Migration[5.2]
  def change
    add_column :likes, :rating, :integer
  end
end
