class Api::V1::AliasController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  # 言い換え表現を定義
  alias current_user current_api_v1_user
  alias authenticate_user! authenticate_api_v1_user!
  alias user_signed_in? api_v1_user_signed_in?
end
