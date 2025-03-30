class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:index, :show, :create, :update, :destroy]
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts_with_medicine
  def index
    @posts = current_user.posts.all.includes(:medicine)

    posts_with_medicine = @posts.map do |post|
      post.as_json.merge(medicine_name: post.medicine&.name)
      post.as_json.merge(medicine_image: post.medicine&.medicine_image)
    end

    render json: posts_with_medicine
  end

  #def index
  #  @posts = current_user.posts.order(post_date: :desc)
  #  render json: @posts
  #end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
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
      params.require(:post).permit(:medicine_id, :ingestion_amount, :comment)
    end
end
