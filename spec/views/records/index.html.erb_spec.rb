require 'rails_helper'

RSpec.describe "records/index", :type => :view do
  before(:each) do
    assign(:records, [
      Record.create!(
        :payload => "MyText"
      ),
      Record.create!(
        :payload => "MyText"
      )
    ])
  end

  it "renders a list of records" do
    render
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
