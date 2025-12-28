// === CLIENT MAILCHIMP (SERVER-ONLY) ===
// IMPORTANT: Ce fichier ne doit JAMAIS être importé côté client
// Utilisé uniquement dans app/api/ (API Routes)

const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

// Validation des variables d'environnement
function validateEnvVars(): void {
  if (!API_KEY) throw new Error('MAILCHIMP_API_KEY is not defined');
  if (!AUDIENCE_ID) throw new Error('MAILCHIMP_AUDIENCE_ID is not defined');
  if (!SERVER_PREFIX) throw new Error('MAILCHIMP_SERVER_PREFIX is not defined');
}

// Types
interface MailchimpError {
  title: string;
  status: number;
  detail: string;
}

interface SubscribeResult {
  success: boolean;
  error?: string;
}

// Validation email côté serveur
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Ajouter un subscriber à Mailchimp
export async function addSubscriber(email: string): Promise<SubscribeResult> {
  validateEnvVars();

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email.toLowerCase().trim(),
        status: 'subscribed',
        tags: ['leadmagnet-audio'],
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    const errorData: MailchimpError = await response.json();

    // Gérer le cas où l'email existe déjà
    if (errorData.title === 'Member Exists') {
      return { success: true }; // On considère ça comme un succès
    }

    // Gérer les emails invalides selon Mailchimp
    if (errorData.title === 'Invalid Resource') {
      return { success: false, error: 'Adresse email invalide' };
    }

    return {
      success: false,
      error: errorData.detail || 'Erreur lors de l\'inscription',
    };
  } catch (error) {
    console.error('Mailchimp API error:', error);
    return {
      success: false,
      error: 'Erreur de connexion au service',
    };
  }
}
