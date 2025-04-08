class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :ensure_not_guest_user, only: [:update, :destroy]

  private

  #ゲストユーザではないかを確認
  def ensure_not_guest_user
    if current_api_v1_user&.email&.include?('@example.com')
      render json: { error: 'ゲストユーザーはアカウント情報を変更できません。' }, status: :forbidden
    end
  end

  # Only allow a list of trusted parameters through.
  def sign_up_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  # Only allow a list of trusted parameters through.
  def account_update_params
    params.permit(:name, :email, :image)
  end
end
