User.destroy_all
u1 = User.new(username: "Ted F", email: "ted@fake.com")
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
u5.save

Giraffe.destroy_all

open_generic_pic = File.open(File.join( Rails.root, 'spec/support/images/testpic.png'))
seed_pic_1 = File.open(File.join( Rails.root, 'app/assets/images/seed_images/giraffe1.jpg'))
seed_pic_2 = File.open(File.join( Rails.root, 'app/assets/images/seed_images/giraffe2.jpg'))
seed_pic_3 = File.open(File.join( Rails.root, 'app/assets/images/seed_images/giraffe3.jpg'))
seed_pic_4 = File.open(File.join( Rails.root, 'app/assets/images/seed_images/giraffe4.jpg'))
seed_pic_5 = File.open(File.join( Rails.root, 'app/assets/images/seed_images/giraffe5.jpg'))
seed_pic_6 = File.open(File.join( Rails.root, 'app/assets/images/seed_images/giraffe6.jpg'))
seed_pic_7 = File.open(File.join( Rails.root, 'app/assets/images/seed_images/giraffe7.jpg'))
seed_pic_8 = File.open(File.join( Rails.root, 'app/assets/images/seed_images/giraffe8.jpg'))
seed_pic_9 = File.open(File.join( Rails.root, 'app/assets/images/seed_images/giraffe9.jpg'))

g1 = Giraffe.create!(user: u1, name: "Steven", description: "He's a cool giraffe. One problem, he thinks that people are leaves, so he wont stop biting them. It's proving to be an issue for a plethora of reasons, but I digress.", image:  seed_pic_1)
g2 = Giraffe.create!(user: u1, name: "Giraffey", description: "Just kind of like if a giraffe was set to default settings. Pretty plain.", image:  seed_pic_2)
g3 = Giraffe.create!(user: u4, name: "Bobby", description: "This giraffe is royalty, who's lineage dates back to ancient Egypt", image:  seed_pic_3)
g4 = Giraffe.create!(user: u3, name: "Sarah", description: "She's a kind giraffe, who loves running around the Savanna", image:  seed_pic_4)
g5 = Giraffe.create!(user: u4, name: "Fillie Stephenson", description: "She's a pretty smart giraffe, she even has her own social security number and credit card debt!", image:  seed_pic_5)
g6 = Giraffe.create!(user: u5, name: "Cornster", description: "Yup, you guessed it, they love corn. Who could've figured that one out.", image:  seed_pic_6)
g7 = Giraffe.create!(user: u4, name: "King", description: "Overall a complete beast of a giraffe. He shatters every giraffe challenge that comes his way.", image:  seed_pic_7)
g8 = Giraffe.create!(user: u3, name: "Giraffe", description: "Beautiful creature, parents weren't too creative with her name though!", image:  seed_pic_8)
g9 = Giraffe.create!(user: u2, name: "Rinko", description: "I love this giraffe! The only problem is she won't stop stealing cash from my wallet while I'm not paying attention, not sure what to do. Advice?", image:  seed_pic_9)
g10 = Giraffe.create!(user: u5, name: "Mann", description: "Here is a poem that the giraffe wrote... Just kidding, giraffes aren't literate! Fooled you!", image: seed_pic_1)
g11 = Giraffe.create!(user: u4, name: "Sterling", description: "Really friendly, basically the perfect giraffe.", image:  seed_pic_2)
g12 = Giraffe.create!(user: u1, name: "Karen", description: "Pretty. I mean what can I say, it's a giraffe. It's got spots and four legs and like a long neck PROBABLY.", image:  seed_pic_3)

r1 = Review.find_or_create_by!(owner: u2, giraffe: g1, rating: 5, comment: "Nice.")
r2 = Review.find_or_create_by!(owner: u2, giraffe: g2, rating: 3, comment: "Eh. Not great, seen better")
r3 = Review.find_or_create_by!(owner: u2, giraffe: g3, rating: 2, comment: "Pft, you call that a giraffe?")
r4 = Review.find_or_create_by!(owner: u4, giraffe: g4, rating: 5, comment: "Is the cutest!?!?!")
r5 = Review.find_or_create_by!(owner: u5, giraffe: g5, rating: 2, comment: "Meh..")
r6 = Review.find_or_create_by!(owner: u1, giraffe: g6, rating: 5, comment: "Best thing I've ever seen in my life...")
r7 = Review.find_or_create_by!(owner: u5, giraffe: g7, rating: 1, comment: "This is just so sad.. It's almost as though you didn't even try with this giraffe!")
r8 = Review.find_or_create_by!(owner: u2, giraffe: g8, rating: 5, comment: "okay this giraffe is just straight up cool, its as simple as that")
r9 = Review.find_or_create_by!(owner: u3, giraffe: g9, rating: 2, comment: "Meh..")
r10 = Review.find_or_create_by!(owner: u1, giraffe: g10, rating: 4, comment: "Pretty solid, still needs some work.")
r11 = Review.find_or_create_by!(owner: u5, giraffe: g11, rating: 1, comment: "You should try harder with your next submission, this just isn't up to standard.")
r12 = Review.find_or_create_by!(owner: u4, giraffe: g12, rating: 3, comment: "this is the most average giraffe I've ever seen, sad!")