class UsersController < ApplicationController
    def user_stocks
        user = User.find_by(id: params[:id])
        render :json => user.transactions
    end
end