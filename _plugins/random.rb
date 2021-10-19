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
end


Liquid::Template.register_filter(Jekyll::Random)
Liquid::Template.register_filter(Jekyll::SquareRoot)
