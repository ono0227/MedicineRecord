class MedicinesController < Api::V1::AliasController
  before_action :authenticate_user!, only: [:index, :show, :create, :update, :destroy]
  before_action :set_medicine, only: %i[ show update destroy ]

  # GET /medicines_with_category
  def index
    @medicines = current_user.medicines.all.includes(:category) # N+1問題を避けるため includes を使用

    medicines_with_category = @medicines.map do |medicine|
      medicine.as_json.merge(category_name: medicine.category&.name)
    end

    render json: medicines_with_category
  end

  #def index
  #  @medicines = current_user.medicines.all
  #  render json: @medicines
  #end

  # GET /medicines/1
  def show
    render json: @medicine.as_json(include: :category)
  end

  # POST /medicines
  def create
    @medicine = current_user.medicines.new(medicine_params)

    if @medicine.save
      render json: @medicine, status: :created, location: @medicine
    else
      render json: @medicine.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /medicines/1
  def update
    if @medicine.update(medicine_params)
      render json: @medicine
    else
      render json: @medicine.errors, status: :unprocessable_entity
    end
  end

  # DELETE /medicines/1
  def destroy
    @medicine.destroy!
    render json: {}, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_medicine
      @medicine = current_user.medicines.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def medicine_params
      params.require(:medicine).permit(:category_id, :name, :medicine_image, :memo, :ingestion_times_per_day, :ingestion_amount_per_day)
    end
end
