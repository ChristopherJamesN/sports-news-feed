class UsersController < ApplicationController
  before_action :authenticate_user, only: [:show]

    def create
      user = User.new(user_params)
      if user.valid? && user.save
        token = Knock::AuthToken.new(payload: { sub: user.id })
        render json: token, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: 500
      end
    end

    def show
      render json: current_user, only: [:id, :email]
    end


    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
