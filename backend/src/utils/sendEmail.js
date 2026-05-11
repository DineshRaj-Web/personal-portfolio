/**
 * Email Utility Service
 * 
 * Production-quality email sending service using Nodemailer with Gmail SMTP
 * 
 * Features:
 * - Gmail App Password authentication
 * - HTML email templates
 * - Error handling and logging
 * - Transporter verification
 * - Environment-based configuration
 */

const nodemailer = require('nodemailer');
const { generateOTPEmailContent } = require('./reactEmailRenderer');

/**
 * Email configuration from environment variables
 */
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  from: process.env.EMAIL_FROM || `Your App <${process.env.GMAIL_EMAIL}>`
};

/**
 * Singleton transporter instance for connection pooling
 * This significantly improves performance by reusing connections
 */
let transporterInstance = null;

/**
 * Get or create email transporter (singleton pattern)
 * @returns {Object} Nodemailer transporter instance
 */
const getTransporter = () => {
  if (!transporterInstance) {
    try {
      console.log('📧 Creating new email transporter...');
      console.log('📧 Email config:', {
        host: emailConfig.host,
        port: emailConfig.port,
        secure: emailConfig.secure,
        user: emailConfig.auth.user ? '***@***' : 'NOT_SET'
      });

      transporterInstance = nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        secure: emailConfig.secure,
        auth: {
          user: emailConfig.auth.user,
          pass: emailConfig.auth.pass
        },
        // Connection pooling for better performance
        pool: true,
        maxConnections: 10,
        maxMessages: 200,
        rateDelta: 1000,
        rateLimit: 10
      });
      console.log('✅ Email transporter created with connection pooling');
    } catch (error) {
      console.error('❌ Failed to create email transporter:', error);
      throw new Error('Email transporter creation failed');
    }
  }
  return transporterInstance;
};


/**
 * Send OTP email to user
 * @param {string} to - Recipient email address
 * @param {string} otp - 6-digit OTP code
 * @param {string} userName - User's name (optional)
 * @returns {Promise<Object>} Email sending result
 */
const sendOTPEmail = async (to, otp, userName = 'User') => {
  console.log('📧 sendOTPEmail called for:', to);

  // Validate required fields
  if (!to || !otp) {
    throw new Error('Recipient email and OTP are required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    throw new Error('Invalid email format');
  }

  // Validate OTP format (6 digits)
  if (!/^\d{6}$/.test(otp)) {
    throw new Error('OTP must be a 6-digit number');
  }

  try {
    console.log('📧 Step 1: Getting transporter...');
    // Get singleton transporter (reuses connection for performance)
    const transporter = getTransporter();

    console.log('📧 Step 2: Generating email content...');
    // Generate email content using React component
    const emailContent = generateOTPEmailContent(otp, userName, 'Your App');

    console.log('📧 Step 3: Preparing mail options...');
    // Prepare email options
    const mailOptions = {
      from: emailConfig.from,
      to: to.trim(),
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    };

    console.log('📧 Step 4: Sending email...');
    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ OTP email sent successfully to ${to}:`, info.messageId);

    return {
      success: true,
      messageId: info.messageId,
      recipient: to,
      otp: otp,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Failed to send OTP email:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error command:', error.command);

    // Return detailed error information
    return {
      success: false,
      error: error.message,
      recipient: to,
      timestamp: new Date().toISOString(),
      details: {
        code: error.code || 'UNKNOWN_ERROR',
        command: error.command || 'UNKNOWN_COMMAND'
      }
    };
  }
};

/**
 * Send general email (reusable for other purposes)
 * @param {Object} options - Email options
 * @returns {Promise<Object>} Email sending result
 */
const sendEmail = async (options) => {
  const { to, subject, html, text, attachments } = options;

  if (!to) {
    throw new Error('Recipient email is required');
  }

  try {
    // Get singleton transporter (reuses connection for performance)
    const transporter = getTransporter();

    // Prepare email options
    const mailOptions = {
      from: emailConfig.from,
      to: to.trim(),
      subject: subject || 'No Subject',
      html: html || '',
      text: text || '',
      attachments: attachments || []
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully to ${to}:`, info.messageId);

    return {
      success: true,
      messageId: info.messageId,
      recipient: to,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Failed to send email:', error);

    return {
      success: false,
      error: error.message,
      recipient: to,
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = {
  sendOTPEmail,
  sendEmail
};
