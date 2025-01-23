class MessageMailer < ApplicationMailer

    def new_message(message)
        @message = message

        mail(to: ENV['EMAIL'], subject: 'New Message')

    end
end
