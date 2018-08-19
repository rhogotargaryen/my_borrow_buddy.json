# frozen_string_literal: true

class LikedItemsController < ApplicationController
  def create
    Like.create(user_id: current_user.id, liked_item_id: params[:id])
    redirect_to items_path
  end

  def index
    @user = User.find_by(id: params[:user_id])
    @l_items = @user.liked_items.map do |x|
      Item.find_by(id: x.id)
    end
  end
end
