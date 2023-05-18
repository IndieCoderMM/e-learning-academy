class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :title
      t.text :description
      t.integer :price
      t.integer :duration
      t.string :img_url
      t.string :instructor

      t.timestamps
    end
  end
end
