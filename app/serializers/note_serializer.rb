class NoteSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :link, :comments
end
