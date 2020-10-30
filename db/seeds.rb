
User.destroy_all

u1 = User.new(username: "Ted Francis", email: "ted@fake.com")
u1.password =  "1234567"
u1.save
u2 = User.new(username: "Josh M", email: "josh@fake.com")
u2.password =  "1234567"
u2.save
u3 = User.new(username: "username3", email: "user3@fake.com")
u3.password =  "1234567"
u3.save
u4 = User.new(username: "jenny", email: "jenny@fake.com")
u4.password =  "1234567"
u4.save
u5 = User.new(username: "George Washington", email: "GW@fake.com")
u5.password =  "1234567"
u5.role = "admin"
u5.save

Giraffe.destroy_all
open_generic_pic = File.open(File.join( Rails.root, 'spec/support/images/testpic.png'))
g1 = Giraffe.create!(user: u1, name: "steven", description: "he's a cool giraffe, but he thinks people are leaves, so he wont stop biting them, which is proving to be problematic in a myriad of ways", image:  open_generic_pic)
g2 = Giraffe.create!(user: u1, name: "giraffey", description: "Just like the default giraffe", image:  open_generic_pic)
g3 = Giraffe.create!(user: u4, name: "bobby", description: "A very odd giraffe, deer shaped and also brown. not sure if he's actually a giraffe", image:  open_generic_pic)
g4 = Giraffe.create!(user: u4, name: "sarah", description: "she's a kind giraffe, who loves running around the Savanna", image:  open_generic_pic)



r1 = Review.find_or_create_by!(owner: u2, giraffe: g1, rating: 5)
r2 = Review.find_or_create_by!(owner: u2, giraffe: g2, rating: 3)
r3 = Review.find_or_create_by!(owner: u2, giraffe: g3, rating: 2)
r4 = Review.find_or_create_by!(owner: u4, giraffe: g4, rating: 5, comment: "Is the cutest!?!?!")
r5 = Review.find_or_create_by!(owner: u5, giraffe: g1, rating: 2, comment: "meh..")
