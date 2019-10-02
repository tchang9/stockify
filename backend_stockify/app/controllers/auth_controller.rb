class AuthController < ApplicationController
    def login
        user = User.find_by(email: params[:email])
  
        if user.password_digest == params[:password]
            render json: {user: user}
        else
            render json: {message: "Invalid username or password"}
        end
    end
end