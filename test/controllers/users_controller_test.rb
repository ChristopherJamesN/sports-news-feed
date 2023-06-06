require './test/test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test 'should create user' do
    assert_difference('User.count') do
      post users_url(host: 'localhost'),
           params: { user: { admin: @user.admin, email: @user.email, password_digest: @user.password_digest } },
           as: :json
    end

    assert_response 201
  end

  test 'should show user' do
    get user_url(@user, host: 'localhost'), as: :json
    assert_response :success
  end

  test 'should update user' do
    patch user_url(@user, host: 'localhost'),
          params: { user: { admin: @user.admin, email: @user.email, password_digest: @user.password_digest } },
          as: :json
    assert_response 200
  end

  test 'should destroy user' do
    assert_difference('User.count', -1) do
      delete user_url(@user, host: 'localhost'), as: :json
    end

    assert_response 204
  end
end
