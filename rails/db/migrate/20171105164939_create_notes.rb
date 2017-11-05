class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
