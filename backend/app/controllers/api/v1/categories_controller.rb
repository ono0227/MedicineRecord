class Api::V1::CategoriesController < Api::V1::AliasController
  before_action :authenticate_user!, only: [:index]

  # GET /categories/enums
  def index
    @categories = current_user.categories.all
    render json: @categories
  end
end
