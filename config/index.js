if (process.env.NODE_ENV === 'test') {
  module.exports = {
    JWT_SECRET: 'codeworkrauthentication',
    oauth: {
      google: {
        clientID: '1092221046085-5qqgbr2bh2kfaspt7mdnl10bbticch85.apps.googleusercontent.com',
        clientSecret: 'A9j_G78YnGiYj_3hkTg3W9bL',
      }
    },
  };
} else {
  module.exports = {
    JWT_SECRET: 'codeworkrauthentication',
    oauth: {
      google: {
        clientID: '1092221046085-5qqgbr2bh2kfaspt7mdnl10bbticch85.apps.googleusercontent.com',
        clientSecret: 'A9j_G78YnGiYj_3hkTg3W9bL',
      }
    },
  };
}