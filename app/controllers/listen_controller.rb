class ListenController < ApplicationController

  def receive
    # puts request.body.read
    render text: "Thanks for sending a POST request with cURL! Payload: #{request.body.read}"
    r = Record.new(payload: request.headers['X-GitHub-Event']);
    r.save
  end

  def update
    render json: {"count" => Record.count, "last_payload" => Record.last.payload}
  end

end
