class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :ensure_not_guest_user, only: [:update, :destroy]
  before_action :configure_permitted_parameters

  def ensure_not_guest_user
    if @resource.email == 'guest@example.com'
      render json: { error: 'ゲストユーザーはアカウント情報を変更できません。' }, status: :forbidden
    end
  end

  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: %i(name))
      devise_parameter_sanitizer.permit(:account_update, keys: %i(name, image))
    end
end
