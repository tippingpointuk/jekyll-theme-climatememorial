module Jekyll
  module Random
    def random(input)
      return rand() unless input
      return input * rand()
    end
  end
end


Liquid::Template.register_filter(Jekyll::Random)
