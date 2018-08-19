# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def check_user
    return head(:forbidden) unless @user == current_user
  end

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def logged_in?
    return head(:forbidden) if current_user.nil?
  end

  def set_item
    @item = Item.find_by(id: params[:id])
  end

  def check_item
    if @item.nil?
      redirect_to new_item_path
    else
      @item.owner_id == current_user.id
    end
  end

  def logged_and_owns_item
    logged_in?
    set_item
    check_item
  end

  def set_check_user
    set_user
    check_user
  end

  def cancel(item)
    redirect_to(item_path(item)) && return
  end
end
