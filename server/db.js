const { Pool, Client } = require('pg');

const myURI = 'postgres://ynlsirdy:x-NmJXBlDSEQgTNPru_raQksrAxrseH_@salt.db.elephantsql.com/ynlsirdy';

const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };