module Api
  class CardsController < ApplicationController 
    def show
      card = Card.find params[:id]
      render json: card, status: 200
    end

    def create
      list = List.find params[:list_id]
      card = list.cards.create(
        title: params[:title],
        position: params[:position]
      )

      render json: card, status: 200
    end

    def update
      card = Card.find params[:id]

      card.update_attributes(
        title: params[:title],
        description: params[:description],
        list_id: params[:list_id],
        position: params[:position],
        labels: params[:labels],
      )

      render json: card, status: 200
    end
  end
end
