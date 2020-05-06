class Board
  include Mongoid::Document
  field :title, type: String

  has_many :lists

  def ordered_lists
    lists.by_position
  end
end
