class Api::V1::UsersController < Api::V1::AliasController
  before_action :authenticate_user!

  def currentuser
    @user = current_user
    render json: { data: @user, status: :success }
  end
end
