require 'rails_helper'

RSpec.describe "histories/index", :type => :view do
  before(:each) do
    assign(:histories, [
      History.create!(
        :action => "Action"
      ),
      History.create!(
        :action => "Action"
      )
    ])
  end

  it "renders a list of histories" do
    render
    assert_select "tr>td", :text => "Action".to_s, :count => 2
  end
end
