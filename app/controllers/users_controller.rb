class UsersController < ApplicationController
  before_action :authenticate_user, only: [:show]

  def create
    user = User.new(user_params)
    if user.valid? && user.save
      token = Knock::AuthToken.new(payload: { sub: user.id })
      render json: token, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :internal_server_error
    end
  end

  def show
    if current_user
      render json: current_user, only: %i[id email]
    else
      render json: 'Those credentials are not correct.', status: :internal_server_error
    end
  end

  def self.from_token_request(request)
    email = request.params['auth'] && request.params['auth']['email']
    find_by email: email || render(json: 'Those credentials are not correct.', status: :internal_server_error)
  end

  def self.from_token_payload(payload)
    find payload['sub']
  end

  def to_token_payload
    { sub: id }
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
