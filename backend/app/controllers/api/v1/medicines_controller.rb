class Api::V1::MedicinesController < Api::V1::AliasController
  before_action :authenticate_user!, only: [:index, :create, :update, :destroy]
  before_action :set_medicine, only: %i[ update destroy ]

  # GET /medicines_with_category
  # Api::V1::MedicinesController#index
  def index
    # ユーザが登録した薬を全て取得し、関連するカテゴリーの情報も含めてインスタンス変数に格納
    @medicines = current_user.medicines.all.includes(:category)

    # インスタンス変数に格納された薬の情報を単位とカテゴリー名の情報を付加してJSON形式で返す
    medicines_with_category = @medicines.map do |medicine|
      category_name = medicine.category&.name || "カテゴリー未設定"
      unit_value = medicine.unit
      merged_data = medicine.as_json.merge(category_name: category_name, unit: unit_value || "単位未設定")
    end

    render json: medicines_with_category
  end

  # POST /medicines
  def create
    category_name = params[:medicine][:category_name]
    category = current_user.categories.find_by(name: category_name)

    #　カテゴリー名とカテゴリーのIDが一致する場合
    if category
      #medicine_paramsからcategory_nameを除外する
      medicine_params_without_category_name = medicine_params.except(:category_name)

      #カテゴリーのIDも含めて薬のインスタンスを作成
      @medicine = current_user.medicines.new(medicine_params_without_category_name.merge(category_id: category.id))

      if @medicine.save
        render json: @medicine, status: :created
      else
        render json: @medicine.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "指定されたカテゴリーが見つかりません" }, status: :not_found
    end
  end

  # PATCH/PUT /medicines/1
  def update
    category_name = params[:medicine][:category_name]
    category = current_user.categories.find_by(name: category_name)

    #　カテゴリー名とカテゴリーのIDが一致する場合
    if category

      #medicine_paramsからcategory_nameを除外する
      medicine_params_without_category_name = medicine_params.except(:category_name)

      #カテゴリーのIDも含めて薬を更新
      if @medicine.update(medicine_params_without_category_name.merge(category_id: category.id))
        render json: @medicine
      else
        render json: @medicine.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "指定されたカテゴリーが見つかりません" }, status: :not_found
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
      params.require(:medicine).permit(:name, :medicine_image, :memo, :unit, :ingestion_times_per_day, :ingestion_amount_every_time, :category_name)
    end
end
