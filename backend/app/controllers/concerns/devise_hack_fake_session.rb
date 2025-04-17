module DeviseHackFakeSession
  extend ActiveSupport::Concern

  # This is  a fake session class that minics the behavior of a real session
  # but does not actually store any data. This is useful for API-only applications
  # where sessions are not used, but some libraries (like Devise)expect a session to be present.
  class FakeSession < Hash
    # 存在する場合、何もしない
    def enabled?
      false
    end

    # セッションが無効になる場合
    def destroy; end
  end

  included do
    before_action :set_fake_session

    private

    # APIモードにおいて、Deviseがセッションを必要とする場合に備えて、FakeSessionを設定
    def set_fake_session
      if Rails.configuration.respond_to?(:api_only) && Rails.configuration.api_only
        request.env['rack.session'] ||= ::DeviseHackFakeSession::FakeSession.new
      end
    end
  end
end
