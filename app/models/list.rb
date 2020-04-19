class List
  include Mongoid::Document
  field :title, type: String

  belongs_to :board
  has_many :cards
end
