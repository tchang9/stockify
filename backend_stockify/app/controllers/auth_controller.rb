class AuthController < ApplicationController
    def login
        user = User.find_by(email: params[:email])
  
        if user and user.password_digest == params[:password]
            render json: {user: user}
        else
            render json: {errors: "Invalid email or password"}
        end
    end
end