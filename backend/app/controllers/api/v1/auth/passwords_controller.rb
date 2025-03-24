class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
    before_action :set_resource, only: :create
    before_action :ensure_not_guest_user, only: :create

    def ensure_not_guest_user
        if @resource && @resource.email.downcase == "guest@example.com"
            render json: { error: 'ゲストユーザーはアカウント情報を変更できません。' }, status: :forbidden
        end
    end

    private

    def set_resource
        @resource = resource_class.find_by(email: resource_params[:email])
    end
end
