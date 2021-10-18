# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-climatememorial"
  spec.version       = "0.1.0"
  spec.authors       = ["joe-irving"]
  spec.email         = ["joe@irving.me.uk"]

  spec.summary       = "A theme for climate memorial walls"
  spec.homepage      = "https://github.com/tippingpointuk/jekyll-theme-climatememorial"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
