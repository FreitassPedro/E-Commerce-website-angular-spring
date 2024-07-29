export default {

  // open id connect
  oidc: {
    clientId: '0oail8ucufDRgt3yA5d7',
    issuer: 'https://dev-74217793.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email']
  }
}
