module Api
  class BoardsController < ApplicationController 
    def show
      @board = Board.find params[:id]
      render json: @board.to_json( include: {lists: {include: :cards}} ), status: 200
    end
  end
end
