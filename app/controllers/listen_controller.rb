class ListenController < ApplicationController

  def receive
    # puts request.body.read
    render text: "Thanks for sending a POST request with cURL! Payload: #{request.body.read}"
  end

  def update
    render json: "success"
  end

end
