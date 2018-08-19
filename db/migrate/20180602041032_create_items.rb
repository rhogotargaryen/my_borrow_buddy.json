# frozen_string_literal: true

class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.string :desc
      t.integer :value
      t.integer :owner_id
      t.integer :user_id
      t.string :requested

      t.timestamps
    end
  end
end
