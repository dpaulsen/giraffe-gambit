
User.destroy_all
u1 = User.find_or_initialize_by(username: "Ted Francis", email: "ted@fake.com")
u1.password =  "1234567"
u1.save
u2 = User.find_or_initialize_by(username: "Josh M", email: "josh@fake.com")
u2.password =  "1234567"
u2.save
u3 = User.find_or_initialize_by(username: "username3", email: "user3@fake.com")
u3.password =  "1234567"
u3.save
u4 = User.find_or_initialize_by(username: "HH", email: "hh@fake.com")
u4.password =  "1234567"
u4.save
u5 = User.find_or_initialize_by(username: "George Washington", email: "GW@fake.com")
u5.password =  "1234567"
u5.save

g1 = Giraffe.find_or_create_by!(user: u1, name: "steven", description: "he's a cool giraffe, but he thinks people are leaves, so he wont stop biting them, which is proving to be problematic in a myriad of ways")
g2 = Giraffe.find_or_create_by!(user: u1, name: "giraffey", description: "Just like the default giraffe")
g3 = Giraffe.find_or_create_by!(user: u4, name: "bobby", description: "A very odd giraffe, deer shaped and also brown. not sure if he's actually a giraffe")
g4 = Giraffe.find_or_create_by!(user: u4, name: "sarah", description: "she's a kind giraffe, who loves running around the Savanna")

r1 = Review.find_or_create_by!(owner: u2, giraffe: g1, rating: 5)
r2 = Review.find_or_create_by!(owner: u2, giraffe: g2, rating: 3)
r3 = Review.find_or_create_by!(owner: u2, giraffe: g3, rating: 2)
r4 = Review.find_or_create_by!(owner: u4, giraffe: g4, rating: 5, comment: "Is the cutest!?!?!")
r5 = Review.find_or_create_by!(owner: u5, giraffe: g1, rating: 2, comment: "meh..")

v1 = Vote.new(user: u2, review: r1, vote: :up)
v2 = Vote.new(user: u2, review: r2, vote: :down)
v1 = Vote.new(user: u2, review: r3, vote: :abstain)
v1 = Vote.new(user: u2, review: r4, vote: :down)
v1 = Vote.new(user: u4, review: r5, vote: :up)
v1 = Vote.new(user: u3, review: r2, vote: :up)
v1 = Vote.new(user: u3, review: r5, vote: :down)