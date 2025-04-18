import admin from 'firebase-admin';

const config = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: String(process.env.FIREBASE_ADMIN_PRIVATE_KEY).replace(
      /\\n/g,
      '\n'
    ),
  }),
};

export const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp(config);
export const authAdmin = admin.auth();
