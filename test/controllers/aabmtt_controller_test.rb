require 'test_helper'

class AabmttControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get aabmtt_index_url
    assert_response :success
  end

end
