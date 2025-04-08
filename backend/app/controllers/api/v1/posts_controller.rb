class Api::V1::PostsController < Api::V1::AliasController
  before_action :authenticate_user!, only: [:index, :create, :update, :destroy]
  before_action :set_post, only: %i[ update destroy ]

  # GET /posts_with_medicine
  def index
    # ユーザの投稿を全て取得し、関連する薬の情報も含めてJSON形式で返す
    @posts = current_user.posts.all.includes(:medicine).order(created_at: :desc)
    render json: @posts.as_json(include: :medicine)
  end

  # POST /posts
  def create
    medicine_name = params[:post][:medicine_name]
    ingestion_amount = params[:post][:ingestion_amount]

    medicine = current_user.medicines.find_by(name: medicine_name)

    #薬が存在しない場合
    if medicine.nil?
      render json: { error: "指定された薬が見つかりません" }, status: :unprocessable_entity
      return
    end

    # 検証に通過した場合、処理を続行
    return unless validate_ingestion_amount(medicine, ingestion_amount) &&
                  validate_total_ingestion_amount(medicine, ingestion_amount)

    @post = current_user.posts.new(post_params.merge(medicine_id: medicine.id))

    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    medicine_name = params[:post][:medicine_name]
    ingestion_amount = params[:post][:ingestion_amount]

    medicine = current_user.medicines.find_by(name: medicine_name)

    #薬が存在しない場合
    if medicine.nil?
      render json: { error: "指定された薬が見つかりません" }, status: :unprocessable_entity
      return
    end

    # 検証に通過した場合、処理を続行
    return unless validate_ingestion_amount(medicine, ingestion_amount) &&
                  validate_total_ingestion_amount(medicine, ingestion_amount, @post&.id)

    if @post.update(post_params.merge(medicine_id: medicine.id))
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
    @post = current_user.posts.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:ingestion_amount, :comment)
  end

  # 服薬量と1回の推奨摂取量の大小を比較
  def validate_ingestion_amount(medicine, ingestion_amount)
    ingestion_everytime = medicine.ingestion_amount_every_time
    if ingestion_amount.to_i > ingestion_everytime.to_i
      render json: { error: "摂取量が1回あたりの推奨量を超えています" }, status: :unprocessable_entity
      return false
    end
    true
  end

  # 1日の服薬量と1日の推奨摂取量の大小を比較
  def validate_total_ingestion_amount(medicine, ingestion_amount, current_post_id = nil)
    today = Time.zone.today
    total_ingestion_amount = current_user.posts
                                        .where(medicine_id: medicine.id)
                                        .where('DATE(created_at) = ?', today) #投稿日とタイムゾーンの日付は合致しているか
                                        .where.not(id: current_post_id) # 更新時に重複加算されることを防止するため
                                        .sum(:ingestion_amount)

    total_ingestion_amount = 0 if total_ingestion_amount.nil? #1日の服薬量の初期値を0にする
    total_ingestion_amount += ingestion_amount.to_i

    max_total_amount = medicine.ingestion_amount_every_time * medicine.ingestion_times_per_day

    if total_ingestion_amount > max_total_amount
      render json: { error: "1日の服薬量が1日の推奨服薬量を超えています"}, status: :unprocessable_entity
      return false
    end
    true
  end
end
