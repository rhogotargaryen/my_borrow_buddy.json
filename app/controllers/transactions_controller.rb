# frozen_string_literal: true

class TransactionsController < ApplicationController
  def new
    @item = Item.find_by(id: params[:item_id])
    case params[:category]
    when 'submit_borrow'
      submit_borrow(@item)
    when 'allow_borrow'
      allow_borrow(@item)
    when 'submit_return'
      submit_return(@item)
    when 'allow_return'
      allow_return(@item)
    end
    redirect_to item_transactions_url(@item)
  end

  def index
    redirect_to item_index_url unless params[:item_id]
    @item = Item.find_by(id: params[:item_id])
    @transactions = @item.transactions
  end
  
  def show
    @transaction = Transaction.find_by(id: params[:id])
    if @transaction.nil?
      redirect_to items_url(message: "no transaction found")
    end
  end

  private

  def transc_params
    params.require(:transaction).permit(:name, :item_id, :category)
  end

  def submit_borrow(item)
    @transaction = Transaction.new(category: 'submit_borrow', item_id: params[:item_id], sender_id: current_user.id, recipient_id: item.owner_id) if item.can_be_borrowed?
    cancel(item) unless @transaction.save
    item.update(requested: 'submit_borrow')
  end

  def allow_borrow(item)
    a = User.find_by(id: params[:recipient_id])
    @transaction = Transaction.new(category: 'allow_borrow', item_id: item.id, sender_id: current_user.id, recipient_id: a.id)
    if !@transaction || !@transaction.save
      cancel(item)
    else
      item.update(user_id: a.id, requested: 'borrowed')
    end
  end

  def submit_return(item)
    @transaction = Transaction.new(category: 'submit_return', item_id: item.id, sender_id: current_user.id, recipient_id: item.owner_id)
    if !@transaction.save
      cancel(item)
    else
      item.update(requested: 'submit_return')
    end
  end

  def allow_return(item)
    a = User.find_by(id: params[:recipient_id])
    @transaction = Transaction.new(category: 'returned', item_id: item.id, sender_id: item.owner_id, recipient_id: a.id)
    if !@transaction.save
      cancel(item)
    else
      item.update(user_id: item.owner_id, requested: 'returned')
    end
  end
end
