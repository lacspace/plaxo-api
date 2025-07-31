import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import SibApiV3Sdk from '@getbrevo/brevo';
import Newsletter from '../models/Newsletter';

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    // Check for existing subscriber
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(200).json({ message: 'You are already subscribed to the Lacspace newsletter!' });
    }

    // Save to database
    const uuid = uuidv4();
    const newsletter = new Newsletter({
      email,
      message: 'Welcome to the Lacspace Family!',
      uuid,
    });
    await newsletter.save();

    // Configure Brevo API client
    const apiClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = apiClient.authentications['api-key'];
    if (!process.env.BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY is not set in the environment variables');
    }
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { name: 'Lacspace Team', email: 'hello@lacspace.com' };
    sendSmtpEmail.to = [{ email, name: email.split('@')[0] }];
    sendSmtpEmail.subject = '🌟 Welcome to Lacspace – Let’s Build the Future Together!';

    sendSmtpEmail.htmlContent = `
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #0f172a;
          color: #ffffff;
        }
        .container {
          max-width: 620px;
          margin: 40px auto;
          background-color: #1e293b;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 12px 24px rgba(0,0,0,0.3);
        }
        .header {
          background: linear-gradient(to right, #00d4ff, #ff007a);
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 25px;
          font-weight: 600;
          color: #ffffff;
        }
        .content {
          padding: 30px 25px;
          line-height: 1.7;
        }
        .content h2 {
          color: #00d4ff;
          margin-bottom: 10px;
        }
        .content p {
          color: #e2e8f0;
          font-size: 15px;
        }
        .highlight {
          background-color: rgba(255, 255, 255, 0.05);
          border-left: 4px solid #00d4ff;
          padding: 15px;
          margin: 20px 0;
          border-radius: 8px;
        }
        .footer {
          background-color: #0f172a;
          padding: 20px;
          text-align: center;
          font-size: 13px;
          color: #94a3b8;
        }
        .social-icons {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
        }
        .social-icons a img {
          width: 32px;
          transition: transform 0.3s ease;
        }
        .social-icons a:hover img {
          transform: scale(1.2);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Lacspace</h1>
          <p style="color:#f1f5f9;">Your journey to digital innovation starts now.</p>
        </div>
        <div class="content">
          <h2>Hello ${email.split('@')[0]},</h2>
          <p>We’re thrilled to have you as part of the Lacspace community! As a subscriber, you'll get first-hand access to groundbreaking solutions, innovation stories, AI insights, and exclusive updates from our Labs.</p>

          <div class="highlight">
            "At Lacspace, we don’t just build software — we shape experiences, deliver results, and design tomorrow’s tech. Welcome aboard!"
            <br><br>
            <strong>– Chandan Karna</strong>, Founder
          </div>

          <p>
            🌟 From AI to automation, here are some of the powerful platforms we’ve built:
            <ul style="color:#e2e8f0; padding-left:20px;">
              <li><strong>Grocista</strong> – Everything from groceries to lifestyle, all in one marketplace.</li>
              <li><strong>ScanSewa</strong> – A robust POS and billing ecosystem.</li>
              <li><strong>FinTech</strong> – Next-gen financial analytics and stock solutions.</li>
              <li><strong>LegalSages</strong> – Legal consulting made simple, digital, and secure.</li>
              <li><strong>Foundation</strong> – Our social-tech wing dedicated to non-profits and causes.</li>
            </ul>
          </p>

          <p>Expect exclusive invites, product launches, and a chance to collaborate via Lacspace Lab.</p>

          <div class="social-icons">
            <a href="https://facebook.com/lacspacetechnologies"><img src="https://img.icons8.com/fluency/48/000000/facebook-new.png" alt="Facebook"></a>
            <a href="https://twitter.com/the_lacspace"><img src="https://img.icons8.com/fluency/48/000000/twitter.png" alt="Twitter"></a>
            <a href="https://instagram.com/the_lacspace"><img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="Instagram"></a>
            <a href="https://in.linkedin.com/company/lacspace"><img src="https://img.icons8.com/fluency/48/000000/linkedin.png" alt="LinkedIn"></a>
            <a href="https://github.com/lacspace"><img src="https://img.icons8.com/fluency/48/000000/github.png" alt="GitHub"></a>
          </div>
        </div>
        <div class="footer">
          📧 hello@lacspace.com | 📞 +977 98177 85629 | 📞 India: +91 99059 61994 <br>
          🌐 <a href="https://www.lacspace.com" style="color:#60a5fa;">www.lacspace.com</a><br>
          © ${new Date().getFullYear()} Lacspace. All rights reserved.
        </div>
      </div>
    </body>
    </html>`;

    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      res.status(201).json({ message: 'Subscribed successfully! Welcome email sent.', uuid });
    } catch (brevoError: any) {
      console.error('Brevo API error:', brevoError.response?.text || brevoError.message);
      if (brevoError.response?.text?.includes('unrecognised IP address')) {
        return res.status(401).json({
          message: 'Server error: Unauthorized IP address',
          error: 'The server IP is not authorized in Brevo. Please add it to the Authorized IPs list in your Brevo account: https://app.brevo.com/security/authorised_ips',
        });
      }
      throw new Error(`Failed to send email via Brevo: ${brevoError.message}`);
    }
  } catch (error: any) {
    console.error('Error in newsletter subscription:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};