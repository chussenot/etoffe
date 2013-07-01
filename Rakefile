require 'yaml'
require 'yajl'
require 'json'
require 'pry'

# Constants
OUTPUT_FILE = 'dist/config.json.exemple'

task :default => [:convert]

task :convert do
  # Load configration file
  conf = YAML.load_file('config/conf.yml')
  # Save to json file
  File.open(OUTPUT_FILE,"w") { |f| f.write JSON.pretty_generate( conf ) }
end

task :check do
  json = File.new(OUTPUT_FILE, 'r')
  parser = Yajl::Parser.new
  conf = parser.parse(json)
end

