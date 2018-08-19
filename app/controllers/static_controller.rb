# frozen_string_literal: true

class StaticController < ApplicationController
  def test
    @testing = current_user
  end

  def welcome; end
end
