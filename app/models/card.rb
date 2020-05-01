class Card
  include Mongoid::Document
  field :title, type: String
  field :description, type: String
  field :position, type: Integer

  belongs_to :list
end
