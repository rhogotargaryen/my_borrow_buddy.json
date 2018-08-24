# frozen_string_literal: true

class CreateLikedItems < ActiveRecord::Migration[5.2]
  def change
    create_table :liked_items do |t|
      t.integer :item_id
      t.string :item_name

      t.timestamps
    end
  end
end
