import { AuthConfig } from "angular-oauth2-oidc";

export const googleAuthConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    clientId: '285965755533-velprlncglc53aovlsl69kpjdlbkk1bf.apps.googleusercontent.com',
    responseType: 'code',
    redirectUri: window.location.origin + '/google/complete',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
    disablePKCE: true
};

export const gitHubAuthConfig: AuthConfig = {
    issuer: 'https://token.actions.githubusercontent.com',
    clientId: '3b4c7a8b75ad6445e73f',
    responseType: 'code',
    redirectUri: window.location.origin + '/github/complete',
    scope: 'read:user%20user:email',
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
    disablePKCE: true
};