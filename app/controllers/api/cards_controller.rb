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
        title: permitted_params[:title],
        description: permitted_params[:description],
        list_id: permitted_params[:list_id],
        position: permitted_params[:position],
        labels: permitted_params[:labels],
        due_date: permitted_params[:due_date],
        checklist: permitted_params[:checklist].to_h
      )

      render json: card, status: 200
    end

    def permitted_params
      params.require(:card).permit(:list_id, :position, :title, :description, :id, checklist: {}, labels: [])
    end
  end
end
