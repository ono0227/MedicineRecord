class Api::V1::AliasController < ApplicationController
    include DeviseTokenAuth::Concerns::SetUserByToken
    alias_method :current_user, :current_api_v1_user
end
  