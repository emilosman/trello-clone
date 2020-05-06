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

    def list_order
      if params[:ordered_lists]
        params[:ordered_lists].each do |list|
          List.find(list['id']).update_attributes(position: list['position'])
        end
      end

      render json: {}, status: 200
    end
  end
end
