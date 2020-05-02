module Api
  class BoardsController < ApplicationController 
    def show
      @board = Board.find params[:id]
      render json: @board.to_json( include: {lists: {include: :cards}} ), status: 200
    end

    def update
      board = Board.find params[:id]

      board.update_attributes(
        title: params[:title],
      )

      render json: board, status: 200
    end
  end
end
