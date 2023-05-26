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
  img_url: "https://img-b.udemycdn.com/course/750x422/705264_caa9_13.jpg",
  instructor: "Peter Ugwu"
)

6.times do |n|
    course = Course.create!(
        title: "Course #{n+1}",
        description: "This is course #{n+1} description.",
        price: rand(50..200),
        duration: rand(20..60),
        img_url: "https://picsum.photos/500/300",
        instructor: "Instructor #{n+1}"
    )
end

user = User.create!(name: "Alice")

4.times do |n|
  reservation = user.reservations.create!(
    course_id: Course.all.sample.id,
    date: rand(1.year.from_now..2.years.from_now).to_date,
    city: ["New York", "London", "Paris", "Tokyo"].sample
  )
end
