if (process.env.node_env === 'production') {
    module.exports = require('./prodkeys.js');
} else {
    module.exports = require('./devkeys.js');
}