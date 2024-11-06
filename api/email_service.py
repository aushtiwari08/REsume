from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/send_email', methods=['POST'])
def send_email_route():
    data = request.get_json()

    full_name = data['fullName']
    email = data['email']
    amount = data.get('amount', '9.99')

    try:
        send_email(full_name, email, amount)
        return jsonify({"success": True, "message": "Email sent successfully."})
    except Exception as e:
        return jsonify({"success": False, "message": f"Error sending email: {str(e)}"})

def send_email(full_name, email, amount):
    sender_email = "your-email@gmail.com"  # Replace with your email
    sender_password = "your-password"  # Replace with your email password
    receiver_email = email
    
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = 'Resume Purchase Confirmation'

    body = f"""
    Hello {full_name},

    Thank you for purchasing the Premium Resume Package for ${amount}.
    Your payment was successful and your resume is attached.

    Best regards,
    ResumeMaker Pro Team
    """
    msg.attach(MIMEText(body, 'plain'))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)
    text = msg.as_string()
    server.sendmail(sender_email, receiver_email, text)
    server.quit()

if __name__ == '__main__':
    app.run(port=5000)