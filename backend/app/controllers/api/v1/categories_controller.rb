class CategoriesController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  # GET /categories
  def index
    @categories = current_user.categories.all

    render json: @categories
  end
end
