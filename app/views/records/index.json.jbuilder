json.array!(@records) do |record|
  json.extract! record, :id, :payload
  json.url record_url(record, format: :json)
end
