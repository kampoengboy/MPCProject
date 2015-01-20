/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        //peserta
        namatim : 'string',
        namaketua : 'string',
        nimketua : 'string',
        namaanggota1 : 'string',
        nimanggota1 : 'string',
        namaanggota2 : 'string',
        nimanggota2 :'string',
        notelp:'string',
        //admin
        nama : 'string',
        email: {
            type: 'string',
            email: true,
            unique: true
      },
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

