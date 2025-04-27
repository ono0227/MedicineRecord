#!/bin/bash
set -e

# Pumaの古いPIDファイルがあれば削除
rm -f /app/tmp/pids/server.pid

#　データベースを更新
bundle exec rails db:migrate

# bundle exec rails assets:precompile

exec "$@"
