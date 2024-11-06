interface EmailData {
  fullName: string;
  email: string;
  amount: string;
}

export const sendResumeEmail = async (data: EmailData): Promise<void> => {
  try {
    const response = await fetch('http://localhost:5000/send_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};