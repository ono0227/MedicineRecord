class Api::V1::AliasController < ApplicationController
    include DeviseTokenAuth::Concerns::SetUserByToken
    #言い換え表現を定義
    alias_method :current_user, :current_api_v1_user
    alias_method :authenticate_user!, :authenticate_api_v1_user!
    alias_method :user_signed_in?, :api_v1_user_signed_in?
end
