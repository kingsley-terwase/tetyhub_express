/**
 * @typedef {Object} CustomerOrder
 * @property {string} id
 * @property {string} date
 * @property {string} item
 * @property {number} amount
 * @property {"completed"|"pending"|"refunded"} status
 */

/**
 * @typedef {Object} Customer
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} segment
 * @property {"active"|"inactive"|"vip"|"prospect"} status
 * @property {string} since
 * @property {number} totalSpend
 * @property {number} totalOrders
 * @property {string} [avatarUrl]
 * @property {string} [notes]
 * @property {CustomerOrder[]} [orders]
 */

export {};
