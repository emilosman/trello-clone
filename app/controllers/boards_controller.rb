class BoardsController < ApplicationController
  def index;end

  def show
    @board = Board.find params[:id]
  end
end
