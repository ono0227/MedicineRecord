FROM ruby:3.2

# 必要パッケージをインストール
RUN apt-get update -qq && apt-get install -y nodejs npm default-mysql-client

WORKDIR /app

# Gemfile系を先にコピー（キャッシュ活用）
COPY Gemfile Gemfile.lock ./

# bundler install（本番用）
RUN gem install bundler && bundle install --without development test

# アプリコードをコピー
COPY . ./

# エントリポイントを設定
COPY entrypoint.prod.sh /usr/bin/entrypoint
RUN chmod +x /usr/bin/entrypoint

ENTRYPOINT ["entrypoint"]

# Puma を起動
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
