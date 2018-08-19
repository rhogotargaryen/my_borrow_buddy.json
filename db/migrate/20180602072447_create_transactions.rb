# frozen_string_literal: true

class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :category
      t.integer :recipient_id
      t.string :sender_id
      t.integer :item_id
      t.datetime :date_of_return
      t.boolean :settled

      t.timestamps
    end
  end
end
