class Api::V1::PostsController < Api::V1::AliasController
  before_action :authenticate_user!, only: [:index, :create, :update, :destroy]
  before_action :set_post, only: %i[ update destroy ]

  # GET /posts_with_medicine
  def index
    @posts = current_user.posts.all.includes(:medicine).order(created_at: :desc)
    render json: @posts.as_json(include: :medicine)
  end
  #def index
  #  @posts = current_user.posts.order(post_date: :desc)
  #  render json: @posts
  #end

  # GET /posts/1
  #def show
  #  render json: @post
  #end

  # POST /posts
  def create
    medicine_name = params[:post][:medicine_name]
    ingestion_amount = params[:post][:ingestion_amount]

    medicine = current_user.medicines.find_by(name: medicine_name)

    if medicine.nil?
      render json: { error: "指定された薬が見つかりません" }, status: :unprocessable_entity
      return
    end

    return unless validate_ingestion_amount(medicine, ingestion_amount)

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

    if medicine.nil?
      render json: { error: "指定された薬が見つかりません" }, status: :unprocessable_entity
      return
    end

    return unless validate_ingestion_amount(medicine, ingestion_amount)

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

    def validate_ingestion_amount(medicine, ingestion_amount)
      ingestion_everytime = medicine.ingestion_amount_every_time
      if ingestion_amount.to_i > ingestion_everytime.to_i
          render json: { error: "摂取量が1回あたりの推奨量を超えています" }, status: :unprocessable_entity
          return false
      end
      true
  end
end
