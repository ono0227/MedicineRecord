class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :ensure_not_guest_user, only: [:update, :destroy]

  def ensure_not_guest_user
    if current_user && current_user.email == 'guest@example.com'
      render json: { error: 'ゲストユーザーはアカウント情報を変更できません。' }, status: :forbidden
    end
  end

  private
    def sign_up_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
    
    def account_update_params
      params.permit(:name, :email, :image)
    end
  
end
