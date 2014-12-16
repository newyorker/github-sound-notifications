class ListenController < ApplicationController

  def receive
    # puts request.body.read
    render text: "Thanks for sending a POST request with cURL! Payload: #{request.body.read}"
    r = Record.new(payload: request.body.read);
    r.save
  end

  def update
    render json: {"count" => Record.count}
  end

end
