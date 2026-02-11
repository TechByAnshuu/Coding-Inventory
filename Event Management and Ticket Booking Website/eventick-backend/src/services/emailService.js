const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Email transporter configuration
let transporter;

// Initialize email service
const initializeEmailService = () => {
    if (process.env.EMAIL_SERVICE === 'sendgrid' && process.env.SENDGRID_API_KEY) {
        // SendGrid configuration
        transporter = nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY
            }
        });
        console.log('✅ Email service initialized with SendGrid');
    } else {
        // Gmail SMTP configuration
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        console.log('✅ Email service initialized with Gmail SMTP');
    }
};

initializeEmailService();

/**
 * Load email template
 * @param {string} templateName - Template file name
 * @param {Object} variables - Variables to replace in template
 * @returns {string} Processed HTML template
 */
const loadTemplate = (templateName, variables = {}) => {
    const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.html`);

    if (!fs.existsSync(templatePath)) {
        return null;
    }

    let template = fs.readFileSync(templatePath, 'utf-8');

    // Replace variables
    Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, variables[key]);
    });

    return template;
};

/**
 * Send OTP email
 * @param {string} email - Recipient email
 * @param {string} otp - OTP code
 * @returns {Promise<Object>} Result
 */
const sendOTPEmail = async (email, otp) => {
    try {
        const html = loadTemplate('otp', { otp, email }) || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #a855f7;">Eventick - Verify Your Email</h2>
        <p>Your OTP code is:</p>
        <h1 style="background: #f3f4f6; padding: 20px; text-align: center; letter-spacing: 5px; color: #a855f7;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `;

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'Eventick <noreply@eventick.com>',
            to: email,
            subject: 'Eventick - Your OTP Code',
            html
        };

        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: 'OTP email sent successfully'
        };
    } catch (error) {
        console.error('Send OTP email error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Send welcome email
 * @param {Object} user - User object
 * @returns {Promise<Object>} Result
 */
const sendWelcomeEmail = async (user) => {
    try {
        const html = loadTemplate('welcome', {
            name: user.name,
            email: user.email,
            frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
        }) || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #a855f7;">Welcome to Eventick! 🎉</h2>
        <p>Hi ${user.name},</p>
        <p>Thank you for joining Eventick! Your account has been successfully created.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse events, sports matches, and movies</li>
          <li>Book tickets instantly</li>
          <li>Manage your bookings</li>
          <li>Get exclusive offers</li>
        </ul>
        <p>Start exploring now!</p>
        <a href="${process.env.FRONTEND_URL}" style="display: inline-block; background: #a855f7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px;">Explore Events</a>
      </div>
    `;

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'Eventick <noreply@eventick.com>',
            to: user.email,
            subject: 'Welcome to Eventick!',
            html
        };

        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: 'Welcome email sent successfully'
        };
    } catch (error) {
        console.error('Send welcome email error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Send password set confirmation email
 * @param {Object} user - User object
 * @returns {Promise<Object>} Result
 */
const sendPasswordSetConfirmation = async (user) => {
    try {
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #a855f7;">Password Set Successfully</h2>
        <p>Hi ${user.name},</p>
        <p>Your password has been set successfully. You can now log in using your email and password.</p>
        <p>If you didn't make this change, please contact us immediately.</p>
      </div>
    `;

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'Eventick <noreply@eventick.com>',
            to: user.email,
            subject: 'Eventick - Password Set Successfully',
            html
        };

        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: 'Password confirmation email sent'
        };
    } catch (error) {
        console.error('Send password confirmation error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Send booking confirmation email
 * @param {Object} booking - Booking object
 * @param {string} qrCodeDataUrl - QR code data URL
 * @returns {Promise<Object>} Result
 */
const sendBookingConfirmation = async (booking, qrCodeDataUrl) => {
    try {
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #a855f7;">Booking Confirmed! 🎫</h2>
        <p>Hi ${booking.user.name},</p>
        <p>Your booking has been confirmed!</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Booking Details</h3>
          <p><strong>Booking ID:</strong> ${booking._id}</p>
          <p><strong>Type:</strong> ${booking.bookingType}</p>
          <p><strong>Seats:</strong> ${booking.totalSeats}</p>
          <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
        </div>
        ${qrCodeDataUrl ? `<img src="${qrCodeDataUrl}" alt="QR Code" style="max-width: 200px; margin: 20px 0;" />` : ''}
        <p>Show this QR code at the venue for entry.</p>
      </div>
    `;

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'Eventick <noreply@eventick.com>',
            to: booking.user.email,
            subject: 'Eventick - Booking Confirmed',
            html
        };

        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: 'Booking confirmation email sent'
        };
    } catch (error) {
        console.error('Send booking confirmation error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Send payment receipt email
 * @param {Object} booking - Booking object with payment details
 * @returns {Promise<Object>} Result
 */
const sendPaymentReceipt = async (booking) => {
    try {
        const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #a855f7;">Payment Receipt</h2>
        <p>Hi ${booking.user.name},</p>
        <p>Thank you for your payment!</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Payment Details</h3>
          <p><strong>Transaction ID:</strong> ${booking.transactionId}</p>
          <p><strong>Amount Paid:</strong> ₹${booking.totalAmount}</p>
          <p><strong>Payment Method:</strong> ${booking.paymentMethod}</p>
          <p><strong>Status:</strong> ${booking.paymentStatus}</p>
        </div>
      </div>
    `;

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'Eventick <noreply@eventick.com>',
            to: booking.user.email,
            subject: 'Eventick - Payment Receipt',
            html
        };

        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: 'Payment receipt email sent'
        };
    } catch (error) {
        console.error('Send payment receipt error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = {
    sendOTPEmail,
    sendWelcomeEmail,
    sendPasswordSetConfirmation,
    sendBookingConfirmation,
    sendPaymentReceipt
};
