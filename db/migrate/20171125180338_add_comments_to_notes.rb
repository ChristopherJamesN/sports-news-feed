class AddCommentsToNotes < ActiveRecord::Migration[5.1]
  def change
    add_column :notes, :comments, :string, array: true, default: []
  end
end
