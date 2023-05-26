require 'rails_helper'

RSpec.describe "Api::Courses", type: :request do
  describe "GET /api/courses" do
    it "works! (now write some real specs)" do
      get api_courses_index_path
      expect(response).to have_http_status(200)
    end
  end
end
