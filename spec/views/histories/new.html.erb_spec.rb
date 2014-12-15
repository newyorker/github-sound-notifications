require 'rails_helper'

RSpec.describe "histories/new", :type => :view do
  before(:each) do
    assign(:history, History.new(
      :action => "MyString"
    ))
  end

  it "renders new history form" do
    render

    assert_select "form[action=?][method=?]", histories_path, "post" do

      assert_select "input#history_action[name=?]", "history[action]"
    end
  end
end
