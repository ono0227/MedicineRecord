class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  # Only allow a list of trusted parameters through.
  def sign_up_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  # Only allow a list of trusted parameters through.
  def account_update_params
    params.permit(:name, :email, :image)
  end
end
