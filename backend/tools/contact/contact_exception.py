class ContactException(Exception):
    def __init__(self, sender_name, sender_email, message):
        self.sender_name = sender_name
        self.sender_email = sender_email
        self.message = message
