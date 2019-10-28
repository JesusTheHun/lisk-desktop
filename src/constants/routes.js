import { tokenMap } from './tokens';

export default {
  toolboxDemo: {
    path: '/toolbox',
    pathSuffix: '/:component?',
    isPrivate: false,
  },
  dashboard: {
    path: '/dashboard',
    isPrivate: false,
  },
  addBookmark: {
    path: '/bookmarks/add-bookmark',
    isPrivate: false,
  },
  monitor: {
    path: '/monitor',
    isPrivate: false,
    exact: true,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  blocks: {
    path: '/monitor/blocks',
    isPrivate: false,
    exact: true,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  delegatesMonitor: {
    path: '/monitor/delegates',
    exact: true,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  bookmarks: {
    path: '/bookmarks',
    isPrivate: false,
  },
  send: {
    path: '/wallet/send',
    isPrivate: true,
  },
  wallet: {
    path: '/wallet',
    pathSuffix: '/:token?',
    isPrivate: true,
  },
  voting: {
    path: '/delegates/vote',
    isPrivate: true,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  delegates: {
    path: '/delegates',
    isPrivate: false,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  settings: {
    path: '/settings',
    isPrivate: false,
  },
  secondPassphrase: {
    path: '/second-passphrase',
    isPrivate: true,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  signMessage: {
    path: '/sign-message',
    isPrivate: true,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  verifyMMessage: {
    path: '/verify-message',
    isPrivate: false,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  registerDelegate: {
    path: '/register-delegate',
    isPrivate: true,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  addAccount: {
    path: '/add-account',
    isPrivate: false,
  },
  extensions: {
    path: '/extensions',
    isPrivate: false,
  },
  accounts: {
    pathPrefix: '',
    path: '/explorer/accounts',
    pathSuffix: '/:address?',
    isPrivate: false,
  },
  transactions: {
    pathPrefix: '',
    path: '/explorer/transactions',
    pathSuffix: '/:id?',
    isPrivate: false,
  },
  hwWallet: {
    path: '/hw-wallet-login',
    isSigninFlow: true,
    isPrivate: false,
  },
  register: {
    path: '/register',
    isPrivate: false,
    isSigninFlow: true,
  },
  login: {
    path: '/',
    isPrivate: false,
    isSigninFlow: true,
    exact: true,
  },
  termsOfUse: {
    path: '/terms-of-use',
    isPrivate: false,
    isSigninFlow: true,
  },
  monitorTransactions: {
    path: '/monitor/transactions',
    isPrivate: false,
    forbiddenTokens: [tokenMap.BTC.key],
  },
  blockDetails: {
    path: '/monitor/blocks',
    pathSuffix: '/:id?',
    isPrivate: false,
    forbiddenTokens: [tokenMap.BTC.key],
  },
};
