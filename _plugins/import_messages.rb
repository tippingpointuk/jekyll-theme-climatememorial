require 'open-uri'
require 'csv'

module ImportCsv
  class Generator < ::Jekyll::Generator
    def generate(site)
      # @csv_data = []
      # CSV.new(URI.open(site.config['messages_csv']), headers: true).each do |line|
      #   line_hash =  line.to_h
      #   if line_hash['message']
      #     @csv_data << line_hash
      #   end
      # end
      # site.data['messages'] = @csv_data
      return
    end
  end
end
