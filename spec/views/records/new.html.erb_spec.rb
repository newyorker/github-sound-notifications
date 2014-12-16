require 'rails_helper'

RSpec.describe "records/new", :type => :view do
  before(:each) do
    assign(:record, Record.new(
      :payload => "MyText"
    ))
  end

  it "renders new record form" do
    render

    assert_select "form[action=?][method=?]", records_path, "post" do

      assert_select "textarea#record_payload[name=?]", "record[payload]"
    end
  end
end
