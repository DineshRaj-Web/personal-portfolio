# 📧 Gmail SMTP Email Setup Guide

## 🚀 Quick Setup

### 1. Install Nodemailer
```bash
npm install nodemailer
```

### 2. Generate Gmail App Password

**Why App Password?**
- Gmail blocks regular password access for security
- App Passwords provide secure access for specific apps
- 2-Factor Authentication is required

**Steps to Generate App Password:**
1. Enable 2-Factor Authentication on your Gmail account
2. Go to: https://myaccount.google.com/apppasswords
3. Select "Mail" for the app
4. Select "Other (Custom name)" and enter "Your App Name"
5. Click "Generate"
6. Copy the 16-character password (without spaces)

### 3. Update .env File
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your credentials
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"

# Gmail SMTP Configuration
GMAIL_EMAIL="your-gmail-address@gmail.com"
GMAIL_APP_PASSWORD="your-16-character-app-password"

# Email Configuration
EMAIL_FROM="Your App Name <noreply@yourapp.com>"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SECURE=false
```

## 🔧 Configuration Details

### Gmail SMTP Settings
- **Host**: smtp.gmail.com
- **Port**: 587 (TLS) or 465 (SSL)
- **Authentication**: App Password required
- **Encryption**: STARTTLS (port 587) or SSL/TLS (port 465)

### Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `GMAIL_EMAIL` | Your Gmail address | `yourapp@gmail.com` |
| `GMAIL_APP_PASSWORD` | 16-char app password | `abcd efgh ijkl mnop` |
| `EMAIL_FROM` | Display name & email | `"Your App <noreply@yourapp.com>"` |
| `EMAIL_HOST` | SMTP server | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_SECURE` | SSL connection | `false` |

## 🚨 Common Gmail Errors & Solutions

### Error: "535-5.7.8 Username and Password not accepted"
**Cause**: Wrong password or 2FA not enabled
**Solution**: 
- Enable 2-Factor Authentication
- Generate new App Password
- Check for typos in .env

### Error: "Application-specific password required"
**Cause**: Using regular password instead of App Password
**Solution**: Generate App Password from Google Account settings

### Error: "Too many simultaneous connections"
**Cause**: Rate limiting or connection pooling issues
**Solution**: 
- Built-in rate limiting in email utility
- Connection pooling enabled
- Try again after a few minutes

### Error: "Gmail has blocked this less secure app"
**Cause**: Account security settings
**Solution**: 
- Use App Password (recommended)
- Or enable "Less secure app access" (not recommended)

## 🧪 Testing Email Functionality

### 1. Test Controller Endpoint
```bash
# Start your server
npm start

# Test forgot password endpoint
curl -X POST http://localhost:5000/auth/forgot-password-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### 2. Expected API Response
```json
{
  "message": "If your email exists in our system, you will receive a password reset OTP. Please check your email and follow the instructions."
}
```

### 3. Console Output
```
Email transporter verified successfully
OTP email sent successfully to test@example.com: <message-id>
Password reset OTP for test@example.com: 123456
```

### 4. Email Preview
You should receive a beautiful HTML email with:
- Professional design with gradients
- Large 6-digit OTP code
- Security instructions
- Mobile-responsive layout
- Your app branding

## 📁 File Structure

```
backend/
├── src/
│   ├── utils/
│   │   └── sendEmail.js          # Email utility service
│   ├── controllers/
│   │   └── auth.controller.js    # Updated with email sending
│   └── ...
├── .env.example                  # Environment template
├── .env                          # Your actual credentials
└── EMAIL_SETUP_GUIDE.md         # This guide
```

## 🔒 Security Best Practices

### ✅ Do's
- Use App Passwords (not regular passwords)
- Store credentials in .env file
- Add .env to .gitignore
- Use TLS/SSL encryption
- Implement rate limiting
- Log email sending attempts

### ❌ Don'ts
- Hardcode credentials in code
- Commit .env to version control
- Use regular Gmail password
- Disable SSL/TLS in production
- Send sensitive data in emails

## 🚀 Production Deployment

### Environment Variables
Set these in your production environment:
```bash
# Production Gmail settings
GMAIL_EMAIL="your-production-email@gmail.com"
GMAIL_APP_PASSWORD="production-app-password"
EMAIL_FROM="Your App <noreply@yourapp.com>"

# Optional: Use transactional email service for production
EMAIL_SERVICE="sendgrid" # or "ses", "mailgun"
```

### Monitoring
- Monitor email delivery rates
- Log failed email attempts
- Set up alerts for email failures
- Use email analytics in production

## 📞 Support

### Gmail Issues
- Google Account: https://myaccount.google.com/
- App Passwords: https://myaccount.google.com/apppasswords
- Gmail Help: https://support.google.com/mail/

### Common Issues
1. **2FA Required**: Enable 2-factor authentication first
2. **App Password**: Must be generated from Google Account settings
3. **Rate Limits**: Gmail has sending limits (100/day for free accounts)
4. **Spam Filters**: Check spam folder for test emails

## 🎯 Next Steps

1. ✅ Install Nodemailer
2. ✅ Generate Gmail App Password
3. ✅ Update .env configuration
4. ✅ Test email sending
5. 🔄 Monitor email delivery
6. 🔄 Add email analytics (optional)
7. 🔄 Implement email templates for other features

Your email OTP system is now production-ready! 🎉
