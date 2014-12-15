require 'rails_helper'

RSpec.describe "histories/show", :type => :view do
  before(:each) do
    @history = assign(:history, History.create!(
      :action => "Action"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Action/)
  end
end
