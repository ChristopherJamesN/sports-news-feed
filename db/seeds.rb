# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Note.create(name: 'First story', description: 'This is the description of the first story.', link: 'www.google.com', comments: ['Some comment', 'Second Comment'], user_id: 1)
Note.create(name: 'Second story', description: 'This is the description of the second story.', link: 'www.google.com', comments: ['Some comment', 'Second Comment'], user_id: 1)
Note.create(name: 'Third story', description: 'This is the description of the third story.', link: 'www.google.com', comments: ['Some comment', 'Second Comment'], user_id: 1)
