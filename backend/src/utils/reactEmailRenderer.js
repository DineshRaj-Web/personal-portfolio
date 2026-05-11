/**
 * React Email Renderer Utility
 * 
 * Converts React email components to HTML for sending with Nodemailer
 * Uses server-side React rendering for email templates
 */

const React = require('react');
const { renderToString } = require('react-dom/server');
const { OTPEmail, OTPEmailText } = require('../components/emails/OTPEmail');

/**
 * Render React email component to HTML string
 * @param {React.Component} Component - React email component
 * @param {Object} props - Props to pass to the component
 * @returns {string} Rendered HTML string
 */
const renderEmailToHTML = (Component, props = {}) => {
  try {
    const htmlString = renderToString(React.createElement(Component, props));
    return htmlString;
  } catch (error) {
    console.error('Failed to render React email component:', error);
    throw new Error('Email rendering failed');
  }
};

/**
 * Generate OTP email HTML using React component
 * @param {string} otp - 6-digit OTP code
 * @param {string} userName - User's name
 * @param {string} appName - Application name
 * @returns {Object} Email content with HTML and text versions
 */
const generateOTPEmailContent = (otp, userName = 'User', appName = 'Your App') => {
  // Validate inputs
  if (!otp || !/^\d{6}$/.test(otp)) {
    throw new Error('Invalid OTP format');
  }

  try {
    // Render HTML version
    const html = renderEmailToHTML(OTPEmail, { otp, userName, appName });
    
    // Generate text version
    const text = OTPEmailText({ otp, userName, appName });

    return {
      html,
      text,
      subject: `🔐 Password Reset Code - Valid for 10 minutes`
    };
  } catch (error) {
    console.error('Failed to generate OTP email content:', error);
    throw new Error('Email content generation failed');
  }
};

/**
 * Render any React email component
 * @param {React.Component} component - React email component
 * @param {Object} props - Component props
 * @returns {string} HTML string
 */
const renderReactEmail = (component, props) => {
  return renderEmailToHTML(component, props);
};

module.exports = {
  renderEmailToHTML,
  generateOTPEmailContent,
  renderReactEmail
};
