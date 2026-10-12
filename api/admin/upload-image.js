import { put } from '@vercel/blob';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'governorshouse2026';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password, image, filename } = req.body;

    // Vérifier le mot de passe
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    if (!image || !filename) {
      return res.status(400).json({ error: 'Image et nom de fichier requis' });
    }

    // Convertir base64 en Buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload vers Vercel Blob
    const blob = await put(filename, buffer, {
      access: 'public',
      addRandomSuffix: true,
    });

    return res.status(200).json({
      success: true,
      url: blob.url,
      message: 'Image uploadée avec succès'
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Erreur lors de l\'upload' });
  }
}
