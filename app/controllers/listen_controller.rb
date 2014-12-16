class ListenController < ApplicationController

  def receive
    # puts request.body.read
    event = request.headers['X-GitHub-Event']
    payload = request.body.read
    if event == 'issue_comment'
      comment = JSON.parse(payload)['comment']['body']
      render text: "Thanks for sending a POST request with cURL! Comment: #{comment}"
      r = Record.new(payload: event, comment: comment)
    else
      render text: "Thanks for sending a POST request with cURL! Payload: #{payload}"
      r = Record.new(payload: event)
    end
    r.save
  end

  def update
    json_output = {}
    json_output["count"] = Record.count
    json_output["last_payload"] = Record.last.payload
    if Record.last.comment != nil 
      json_output["last_comment"] = Record.last.comment
    end 
    render json: json_output
  end

end
