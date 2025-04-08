class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController
    private

    # Only allow a list of trusted parameters through.
    def resource_params
      params.require(:session).permit(:email, :password)
    end
end
