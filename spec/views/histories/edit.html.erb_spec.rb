require 'rails_helper'

RSpec.describe "histories/edit", :type => :view do
  before(:each) do
    @history = assign(:history, History.create!(
      :action => "MyString"
    ))
  end

  it "renders the edit history form" do
    render

    assert_select "form[action=?][method=?]", history_path(@history), "post" do

      assert_select "input#history_action[name=?]", "history[action]"
    end
  end
end
