module Jekyll
  module Random
    def random(input)
      return rand() unless input
      return input * rand()
    end
  end
  module SquareRoot
    def sqroot(input)
      return unless input
      return Math.sqrt(input)
    end
  end
  module Buttons
    def buttonify(input)
      return unless input.is_a?(Array)
      return unless input.length() > 0
      o = "<div class='Flex-Line'>"
      input.each do |b|
        o += "<a href='#{b['target']}'><div class='button'>#{b['text']}</div></a>"
      end
      o += "</div>"
      return o
    end
  end
end


Liquid::Template.register_filter(Jekyll::Random)
Liquid::Template.register_filter(Jekyll::SquareRoot)
Liquid::Template.register_filter(Jekyll::Buttons)
