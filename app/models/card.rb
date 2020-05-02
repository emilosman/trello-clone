class Card
  include Mongoid::Document
  field :title, type: String
  field :description, type: String
  field :position, type: Integer
  field :labels, type: Array, default: []

  belongs_to :list
end
