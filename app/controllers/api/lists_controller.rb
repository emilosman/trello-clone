module Api
  class ListsController < ApplicationController 
    def update
      list = List.find params[:id]

      list.update_attributes(
        title: params[:title],
        position: params[:position]
      )

      render json: list, status: 200
    end
  end
end
