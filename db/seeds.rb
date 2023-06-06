# Clear existing data
Reservation.destroy_all
User.destroy_all
Course.destroy_all

Course.create(
  title: "Programming with Python",
  description: "Learn the basics of programming in python.",
  price: 399,
  duration: 30,
  img_url: "https://miro.medium.com/v2/resize:fit:840/1*RJMxLdTHqVBSijKmOO5MAg.jpeg",
  instructor: "Thomas Obuya"
)

Course.create(
  title: "Web Development Fundamentals",
  description: "Build foundational skills in web development.",
  price: 149,
  duration: 45,
  img_url: "https://www.onlinecoursereport.com/wp-content/uploads/2020/07/shutterstock_394793860-1024x784.jpg",
  instructor: "Hein Thant"
)

Course.create(
  title: "Ruby on Rails full course",
  description: "Build foundational skills in Ruby on Rails.",
  price: 109,
  duration: 40,
  img_url: "https://www.techrepublic.com/wp-content/uploads/2022/07/ruby-on-rails-offerings-770x366.jpeg",
  instructor: "Tanveer Ahmad"
)

Course.create(
  title: "React and Redux full course",
  description: "Build foundational skills in React and Redux.",
  price: 169,
  duration: 55,
  img_url: "https://elysiumacademy.org/wp-content/uploads/2018/12/REACT-JS.jpg",
  instructor: "Peter Ugwu"
)

Course.create(
  title: "Photography Masterclass",
  description: "Learn the art of photography and enhance your skills.",
  price: 199,
  duration: 40,
  img_url: "https://ehabphotography.com/wp-content/uploads/2018/08/learn-feature.jpeg",
  instructor: "Julia Rodriguez"
)

Course.create(
  title: "Graphic Design Essentials",
  description: "Master the essentials of graphic design and create stunning visuals.",
  price: 149,
  duration: 30,
  img_url: "https://www.miuc.edu.pk/wp-content/uploads/2021/07/graphic-design1.jpg",
  instructor: "Daniel Thompson"
)

Course.create(
  title: "Music Theory for Beginners",
  description: "Discover the basics of music theory and improve your musical knowledge.",
  price: 99,
  duration: 20,
  img_url: "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/site/965/images/HYIlFlmDT7CtbkrldoOY_UMC-CMT-3D.png",
  instructor: "Sophia Martinez"
)

Course.create(
  title: "Creative Writing Workshop",
  description: "Unleash your creativity through various writing exercises and techniques.",
  price: 129,
  duration: 25,
  img_url: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F407391319%2F377863331725%2F1%2Foriginal.20220624-104035?w=1000&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=9b8b5e147b16a6feb08fd00b1d23f6aa",
  instructor: "Olivia Wilson"
)

user = User.create(name: "John Doe")

course1 = Course.first
course2 = Course.second
course3 = Course.third

reservation1 = Reservation.create(course: course1, user: user, date: Date.today, city: "New York")
reservation2 = Reservation.create(course: course2, user: user, date: Date.today + 1, city: "Los Angeles")
reservation3 = Reservation.create(course: course3, user: user, date: Date.today + 2, city: "Chicago")
