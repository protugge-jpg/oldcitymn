const bcrypt = require('bcrypt');

const password = process.argv[2];
if (!password) {
    // eslint-disable-next-line no-console
    console.log('Usage: npm run hash:admin -- <your-password>');
    process.exit(1);
}

bcrypt.hash(password, 10).then(hash => {
    // eslint-disable-next-line no-console
    console.log('ADMIN_PASSWORD_HASH=' + hash);
});
