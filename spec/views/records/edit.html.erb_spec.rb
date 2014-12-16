require 'rails_helper'

RSpec.describe "records/edit", :type => :view do
  before(:each) do
    @record = assign(:record, Record.create!(
      :payload => "MyText"
    ))
  end

  it "renders the edit record form" do
    render

    assert_select "form[action=?][method=?]", record_path(@record), "post" do

      assert_select "textarea#record_payload[name=?]", "record[payload]"
    end
  end
end
