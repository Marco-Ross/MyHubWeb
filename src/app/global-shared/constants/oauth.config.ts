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

export const facebookAuthConfig: AuthConfig = {
    clientId: '1625894287930451',
    responseType: 'code',
    redirectUri: window.location.origin + '/facebook/complete',
    scope: 'public_profile%20email'
};