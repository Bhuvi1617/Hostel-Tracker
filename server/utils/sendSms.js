import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendSMS(to, message) {
  if (!message || !message.trim()) {
    throw new Error('Message body is required');
  }

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.USER_PHONE_NUMBER,
    });
    console.log(' SMS sent:', result.sid);
  } catch (error) {
    console.error(' SMS failed:', error.message);
  }
}
