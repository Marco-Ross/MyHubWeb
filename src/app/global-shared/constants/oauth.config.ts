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
    issuer: 'https://facebook.com',
    clientId: '285965755533-velprlncglc53aovlsl69kpjdlbkk1bf.apps.googleusercontent.com',
    responseType: 'code',
    redirectUri: window.location.origin + '/facebook/complete',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
    disablePKCE: true
};