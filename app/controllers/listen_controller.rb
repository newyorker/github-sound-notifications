class ListenController < ApplicationController

  def receive
    # puts request.body.read
    event = request.headers['X-GitHub-Event']
    body = request.body.read
    render text: "Thanks for sending a POST request with cURL! Payload: #{body}"
    r = Record.new(payload: event)
    if event == 'issue_comment'
      r.comment = body.comment.body
    end
    r.save
  end

  def update
    json_output["count"] = Record.count
    json_output["last_payload"] = Record.last.payload
    if Record.last.comment != nil 
      json_output["last_comment"] = Record.last.comment
    end 
    render json: json_output
  end

end
