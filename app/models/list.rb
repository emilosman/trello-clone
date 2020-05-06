class List
  include Mongoid::Document
  field :title, type: String
  field :position, type: Integer

  belongs_to :board
  has_many :cards

  def ordered_cards
    cards.by_position
  end
end
