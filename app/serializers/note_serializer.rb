class NoteSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :link, :comments, :user_id
end
