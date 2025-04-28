class Api::V1::Rails::HealthController < ApplicationController
  def show
    head :ok
  end
end
