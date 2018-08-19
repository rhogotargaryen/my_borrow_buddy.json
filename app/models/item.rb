# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :user
  has_many :transactions
  validates :name, presence: true
  validates :desc, presence: true
  validates :value, presence: true

  def can_be_borrowed?
    owner_id == user_id && %w[returned added_item].include?(requested)
  end

  def id_recipient
    transactions.last.sender_id
  end

  def borrower
    owner_id != user_id ? User.find(user_id) : 'possesion by owner'
  end

  def self.owned_by(o_id)
    where('owner_id = ?', o_id)
  end

  def self.borrowed
    where('user_id != owner_id').where('requested = ?', 'borrowed')
  end

  def self.borrowable
    where('user_id == owner_id').where('requested = ? OR requested = ?', 'added_item', 'returned')
  end

  def self.allow_borrow
    where('user_id == owner_id').where('requested = ?', 'submit_borrow')
  end

  def self.allow_return
    where('user_id != owner_id').where('requested = ?', 'submit_return')
  end
end
