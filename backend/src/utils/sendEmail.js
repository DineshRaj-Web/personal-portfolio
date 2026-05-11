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
 * Create and verify email transporter
 * @returns {Object} Nodemailer transporter instance
 */
const createTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass
      },
      // Add connection pooling and rate limiting
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5
    });

    return transporter;
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    throw new Error('Email transporter creation failed');
  }
};

/**
 * Verify email transporter connection
 * @param {Object} transporter - Nodemailer transporter
 * @returns {Promise<boolean>} Connection verification status
 */
const verifyTransporter = async (transporter) => {
  try {
    await transporter.verify();
    console.log('Email transporter verified successfully');
    return true;
  } catch (error) {
    console.error('Email transporter verification failed:', error);
    return false;
  }
};


/**
 * Send OTP email to user
 * @param {string} to - Recipient email address
 * @param {string} otp - 6-digit OTP code
 * @param {string} userName - User's name (optional)
 * @returns {Promise<Object>} Email sending result
 */
const sendOTPEmail = async (to, otp, userName = 'User') => {
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

  let transporter;
  
  try {
    // Create transporter
    transporter = createTransporter();
    
    // Verify transporter connection
    const isVerified = await verifyTransporter(transporter);
    if (!isVerified) {
      throw new Error('Email transporter verification failed');
    }

    // Generate email content using React component
    const emailContent = generateOTPEmailContent(otp, userName, 'Your App');
    
    // Prepare email options
    const mailOptions = {
      from: emailConfig.from,
      to: to.trim(),
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`OTP email sent successfully to ${to}:`, info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      recipient: to,
      otp: otp,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Failed to send OTP email:', error);
    
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
  } finally {
    // Close transporter connection
    if (transporter) {
      transporter.close();
    }
  }
};

/**
 * Send general email (reusable for other purposes)
 * @param {Object} options - Email options
 * @returns {Promise<Object>} Email sending result
 */
const sendEmail = async (options) => {
  const { to, subject, html, text, attachments } = options;
  
  if (!to || !subject) {
    throw new Error('Recipient email and subject are required');
  }

  let transporter;
  
  try {
    transporter = createTransporter();
    
    const mailOptions = {
      from: emailConfig.from,
      to: to.trim(),
      subject,
      html,
      text,
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Failed to send email:', error);
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  } finally {
    if (transporter) {
      transporter.close();
    }
  }
};

module.exports = {
  sendOTPEmail,
  sendEmail,
  createTransporter,
  verifyTransporter
};
