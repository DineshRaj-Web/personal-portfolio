/**
 * React Email Component for OTP
 * 
 * Modern, responsive OTP email template using React Email syntax
 * Compatible with React Email renderer for production email sending
 */

const React = require('react');

// Main OTP Email Component
const OTPEmail = ({ otp, userName = 'User', appName = 'Your App' }) => {
  return React.createElement('html', { lang: 'en' },
    React.createElement('head', null,
      React.createElement('meta', { charSet: 'UTF-8' }),
      React.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      React.createElement('title', null, 'Password Reset OTP'),
      React.createElement('style', { dangerouslySetInnerHTML: { __html: styles } })
    ),
    React.createElement('body', null,
      React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'header' },
          React.createElement('div', { className: 'logo' }, `🔐 ${appName}`),
          React.createElement('h1', { className: 'title' }, 'Password Reset Code')
        ),
        React.createElement('p', null, `Hello ${userName},`),
        React.createElement('p', null, 'You\'ve requested to reset your password. Use the verification code below to proceed:'),
        React.createElement('div', { className: 'otp-container' },
          React.createElement('div', { className: 'otp-code' }, otp)
        ),
        React.createElement('div', { className: 'instructions' },
          React.createElement('strong', null, 'Instructions:'),
          React.createElement('br', null),
          '1. Enter this 6-digit code in the password reset form',
          React.createElement('br', null),
          '2. This code will expire in 10 minutes',
          React.createElement('br', null),
          '3. If you didn\'t request this, please ignore this email'
        ),
        React.createElement('div', { className: 'warning' },
          React.createElement('strong', null, '⚠️ Security Notice:'),
          ' Never share this code with anyone. Our team will never ask for your verification code.'
        ),
        React.createElement('p', null, 'If you have any questions or didn\'t request this reset, please contact our support team.'),
        React.createElement('div', { className: 'footer' },
          React.createElement('p', null,
            'Best regards,',
            React.createElement('br', null),
            'The Security Team',
            React.createElement('br', null),
            appName
          ),
          React.createElement('p', { className: 'auto-text' },
            'This is an automated message. Please do not reply to this email.'
          )
        )
      )
    )
  );
};

// CSS Styles for the email
const styles = `
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
  }
  
  .container {
    background: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #4a90e2;
    margin-bottom: 10px;
  }
  
  .title {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
  }
  
  .otp-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    padding: 20px;
    margin: 30px 0;
    text-align: center;
  }
  
  .otp-code {
    font-size: 36px;
    font-weight: bold;
    color: white;
    letter-spacing: 8px;
    margin: 10px 0;
    font-family: 'Courier New', monospace;
  }
  
  .instructions {
    background: #f8f9fa;
    border-left: 4px solid #4a90e2;
    padding: 15px;
    margin: 20px 0;
    border-radius: 5px;
  }
  
  .footer {
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    color: #666;
    font-size: 14px;
  }
  
  .warning {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    color: #856404;
    padding: 10px;
    border-radius: 5px;
    margin: 15px 0;
  }
  
  .auto-text {
    font-size: 12px;
    margin-top: 20px;
  }
  
  @media (max-width: 600px) {
    .container {
      padding: 20px;
    }
    .otp-code {
      font-size: 28px;
      letter-spacing: 6px;
    }
  }
`;

// Text-only version for email clients that don't support HTML
const OTPEmailText = ({ otp, userName = 'User', appName = 'Your App' }) => {
  return `
Hello ${userName},

You've requested to reset your password. Use this verification code to proceed:

OTP Code: ${otp}

This code will expire in 10 minutes.

Instructions:
1. Enter this 6-digit code in the password reset form
2. This code will expire in 10 minutes  
3. If you didn't request this, please ignore this email

Security Notice: Never share this code with anyone. Our team will never ask for your verification code.

If you have any questions or didn't request this reset, please contact our support team.

Best regards,
The Security Team
${appName}

This is an automated message. Please do not reply to this email.
  `.trim();
};

// Exports
module.exports = {
  OTPEmail,
  OTPEmailText
};
