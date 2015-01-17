/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        nama : 'string',
        email: {
            type: 'string',
            email: true,
            unique: true
      },
      nim : 'string',
      kelas : 'string',
      admin: {
            type: 'boolean',
            defaultsTo: false
      },
      encryptedPassword: {
            type: 'string'
      },
      username: 'string',
  },
};

