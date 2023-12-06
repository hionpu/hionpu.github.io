---
ID: 0
Type: Error
createdAt: 2023-12-04 17:18
tags:
  - blog
  - jekyll
  - polyglot
  - error
title: Jekyll polyglot 에러 처리
lang: ko
permalink: /posts/Jekyll_polyglot_Error
lastmod: 2023-12-04 15:22
---
# Polyglot 의존성 문제
![image](https://github.com/hionpu/hionpu.github.io/assets/111286364/c9f5de67-c2b2-45e1-9bfd-00c92524ac97)
위와 같은 에러가 발생했는데

(텍스트)
>Dependency Error: Yikes! It looks like you don't have jekyll-polyglot or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. If you've run Jekyll with `bundle exec`, ensure that you have included the jekyll-polyglot gem in your Gemfile as well. The full error message from Ruby is: 'cannot load such file -- jekyll-polyglot' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
>
C:/Users/user/.local/share/gem/ruby/3.2.0/gems/jekyll-4.3.2/lib/jekyll/external.rb:70:in `rescue in block in require_with_graceful_fail': jekyll-polyglot (Jekyll::Errors::MissingDependencyException)

polyglot의 의존성 문제로 보인다. 

[다국어 플러그인 - jekyll에서 다국어를 대응하기 위해 사용하는 플러그인을 소개합니다. 다국어 플러그인 jekyll-polyglot의 설치와 설정에 대해서 알아봅니다. (posstree.com)](https://deku.posstree.com/ko/jekyll/multi-languages-plugin/?fbclid=IwAR0QSbEdz_KGj4C4DHggh1aFAhVFoUzv35E3bsnf7eRa8tG79REkvVaQorQ)
[Polyglot으로 다국어 블로그 만들기 (developerlee79.github.io)](https://developerlee79.github.io/blog/polyglot)
등의 포스팅에서 알려준 대로

```
gem 'jekyll-polyglot'
```
또는
```
gem install jekyll-polyglot
```
으로 polyglot 플러그인을 설치하고

<font color = "red">_config.yml </font>내부에 
```
plugins: 
 - jekyll-polyglot
```
를 작성해주어도 발생했다.

gem을 업데이트하고, bundle과 polyglot도 업데이트 해보았지만 고쳐지지 않아서 오류 그대로 GPT한테 물어보았는데 Gemfile을 수정하라고 알려줬다. Gemfile을 편집기로 열고 내부에
```
gem "jekyll-polyglot"
```
를 추가했더니 해당 오류는 뜨지 않게 됐는데 다른 오류가 발생했다.

![image](https://github.com/hionpu/hionpu.github.io/assets/111286364/2118171b-7556-43b8-86b9-6ac2236cfc2b)

(텍스트)
> C:/Users/user/.local/share/gem/ruby/3.2.0/gems/jekyll-polyglot-1.7.0/lib/jekyll/polyglot/patches/jekyll/site.rb:215:in `relative_url_regex': target of repeat operator is not specified: /href="?\/((?:(?!*.gem)(?!*.gemspec)(?!docs)(?!tools)(?!README.md)(?!LICENSE)(?!rollup.config.js)(?!package*.json)(?!.sass-cache)(?!.jekyll-cache)(?!gemfiles)(?!Gemfile)(?!Gemfile.lock)(?!node_modules)(?!vendor\/bundle\/)(?!vendor\/cache\/)(?!vendor\/gems\/)(?!vendor\/ruby\/)(?!javascript)(?!images)(?!css)(?!ja\/)(?!ko\/)(?!en\/)[^,'"\s\/?.]+\.?)*(?:\/[^\]\[)("'\s]*)?)"/ (RegexpError)

regex = regular expression이고 실제로 <font color = "red">site.rb </font> 파일을 편집기로 열어서 해당 부분(215줄)로 가보면

```
def relative_url_regex(disabled = false)
  regex = ''
  unless disabled
    @exclude.each do |x|
      regex += "(?!#{x})"
    end
    @languages.each do |x|
      regex += "(?!#{x}\/)"
    end
  end
  start = disabled ? 'ferh' : 'href'
  %r{#{start}="?#{@baseurl}/((?:#{regex}[^,'"\s/?.]+\.?)*(?:/[^\]\[)("'\s]*)?)"}
end
```

과 같은 정규식이 포함된 함수가 있는데 이 부분에서 에러가 발생

정규식을 잘 모르고 지금 배워서 해결하고 싶지는 않았기 때문에 GPT에게 질문, 직접 수정하라고 지시했더니 

```
def relative_url_regex(disabled = false)
  regex = ''
  unless disabled
    @exclude.each do |x|
      escaped_x = Regexp.escape(x)
      regex += "(?!#{escaped_x})"
    end
    @languages.each do |x|
      escaped_x = Regexp.escape(x)
      regex += "(?!#{escaped_x}\/)"
    end
  end
  start = disabled ? 'ferh' : 'href'
  %r{#{start}="?#{@baseurl}/((?:#{regex}[^,'"\s/?.]+\.?)*(?:/[^\]\[)("'\s]*)?)"}
end
```

로 수정해주었는데 바뀐 부분은
```
regex += "(?!#{x})"
```
와
```
regex += "(?!#{x}\/)"
```
에서 그냥 `x` 가 아닌

```
escaped_x = Regexp.escape(x)
regex += "(?!#{escaped_x})"
```

처럼 `Regexp.escape()`를 사용해서 `escaped_x`로 치환해주었다.

에러가 발생한 원인은 (GPT에 의하면) 정규표현식 자체가 원래 까다롭고, 버전이 변경됨에 따라 수정사항을 반영하지 못한것 때문일 수 있다고 한다. 그런데 내가 polyglot 적용을 위해 참고한 포스팅이 2023년 8월경에 작성된 것으로 기억하는데 몇달 사이에 변화가 있던 건가?

아무튼 위 수정사항을 적용하니 이번에는 동일한 <font color = "red">site.rb </font> 파일의 235번째 줄에서 에러가 발생했다. 생김새를 보니 비슷한 문제인 듯 했고 역시 GPT가 위와 같이 정규표현식을 수정해주었다.

__수정 전__
```
 def absolute_url_regex(url, disabled = false)
      regex = ''
      unless disabled
        @exclude.each do |x|
          regex += "(?!#{x})"
        end
        @languages.each do |x|
          regex += "(?!#{x}\/)"
        end
      end
      start = disabled ? 'ferh' : 'href'
      %r{(?<!hreflang="#{@default_lang}" )#{start}="?#{url}#{@baseurl}/((?:#{regex}[^,'"\s/?.]+\.?)*(?:/[^\]\[)("'\s]*)?)"}
    end
```

__수정 후__
```
def absolute_url_regex(url, disabled = false)
  regex = ''
  unless disabled
    @exclude.each do |x|
      escaped_x = Regexp.escape(x)
      regex += "(?!#{escaped_x})"
    end
    @languages.each do |x|
      escaped_x = Regexp.escape(x)
      regex += "(?!#{escaped_x}\/)"
    end
  end
  start = disabled ? 'ferh' : 'href'
  %r{(?<!hreflang="#{@default_lang}" )#{start}="?#{url}#{@baseurl}/((?:#{regex}[^,'"\s/?.]+\.?)*(?:/[^\]\[)("'\s]*)?)"}
end
```

적용하고 나니 
![image](https://github.com/hionpu/hionpu.github.io/assets/111286364/fef41fa3-8a97-49e9-ac25-031ffe1dc1b4)
빌드가 잘 됐고

![image](https://github.com/hionpu/hionpu.github.io/assets/111286364/f715ed0f-353a-44f5-9912-41845ab9a0d8)
한글컨텐츠와 영어컨텐츠가 한 게시물에서 버전만 달리하여 잘 표시된다.

이제 플러그인을 깃헙에서 적용시키고 SEO 최적화를 할 것이다.