class Api::V1::PostsController < Api::V1::AliasController
  before_action :authenticate_user!, only: [:index, :create, :update, :destroy]
  before_action :set_post, only: %i[update destroy]

  # GET /posts_with_medicine
  def index
    # ユーザの投稿を全て取得し、関連する薬の情報も含めてJSON形式で返す
    @posts = current_user.posts.all.includes(:medicine).order(created_at: :desc)

    render json: @posts.map { |post|
      post.as_json.merge(
        medicine: post.medicine.as_json.merge(
          medicine_image: post.medicine.medicine_image.present? ? request.base_url + post.medicine.medicine_image.url : nil
        )
      )
    }
  end

  # POST /posts
  def create
    medicine_name = params[:post][:medicine_name]

    medicine = current_user.medicines.find_by(name: medicine_name)

    # medicine_paramsからmedicine_nameとmedicine_imageを除外する
    post_params_without_medicine_name_and_medicine_image = post_params.except(:medicine_name, :medicine_image)

    # 薬のIDも含めて薬のインスタンスを作成
    @post = current_user.posts.new(post_params_without_medicine_name_and_medicine_image.merge(medicine_id: medicine.id))

    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    medicine_name = params[:post][:medicine_name]

    medicine = current_user.medicines.find_by(name: medicine_name)

    # post_paramsからmedicine_nameとmedicine_imageを除外する
    post_params_without_medicine_name_and_medicine_image = post_params.except(:medicine_name, :medicine_image)

    # 薬のIDも含めてpostを更新
    if @post.update(post_params_without_medicine_name_and_medicine_image.merge(medicine_id: medicine.id))
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
    render json: {}, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    # binding.pry
    @post = current_user.posts.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:ingestion_amount, :comment, :medicine_name, :medicine_image)
  end
end
