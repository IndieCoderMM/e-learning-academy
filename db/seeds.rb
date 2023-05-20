# Clear existing data
Reservation.destroy_all
User.destroy_all
Course.destroy_all

6.times do |n|
    course = Course.create!(
        title: "Course #{n+1}",
        description: "This is course #{n+1} description.",
        price: rand(50..200),
        duration: rand(20..60),
        img_url: "https://example.com/course#{n+1}.jpg",
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