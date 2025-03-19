class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
    before_action: :ensure_not_guest_user, only: :create

    def ensure_not_guest_user
        if @email.downcase == "guest@example.com"
            render json: { error: 'ゲストユーザーはアカウント情報を変更できません。' }, status: :forbidden
        end
    end
end
