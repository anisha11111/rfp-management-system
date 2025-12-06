const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('✓ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  process.exit(-1);
});

// Helper function to execute queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// RFP Database Methods
const rfpDB = {
  create: async (rfpData) => {
    const { title, description, rawInput, budget, deliveryDeadline, paymentTerms, warrantyRequirement, items } = rfpData;
    const text = `
      INSERT INTO rfps (title, description, raw_input, budget, delivery_deadline, payment_terms, warranty_requirement, items, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const values = [title, description, rawInput, budget, deliveryDeadline, paymentTerms, warrantyRequirement, JSON.stringify(items), 'draft'];
    const result = await query(text, values);
    return result.rows[0];
  },

  findAll: async () => {
    const text = 'SELECT * FROM rfps ORDER BY created_at DESC';
    const result = await query(text);
    return result.rows;
  },

  findById: async (id) => {
    const text = 'SELECT * FROM rfps WHERE id = $1';
    const result = await query(text, [id]);
    return result.rows[0];
  },

  update: async (id, updates) => {
    const { status } = updates;
    const text = 'UPDATE rfps SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *';
    const result = await query(text, [status, id]);
    return result.rows[0];
  },

  delete: async (id) => {
    const text = 'DELETE FROM rfps WHERE id = $1';
    await query(text, [id]);
  }
};

// Vendor Database Methods
const vendorDB = {
  create: async (vendorData) => {
    const { name, email, contactPerson, phone, address, notes } = vendorData;
    const text = `
      INSERT INTO vendors (name, email, contact_person, phone, address, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [name, email, contactPerson, phone, address, notes];
    const result = await query(text, values);
    return result.rows[0];
  },

  findAll: async () => {
    const text = 'SELECT * FROM vendors ORDER BY name ASC';
    const result = await query(text);
    return result.rows;
  },

  findById: async (id) => {
    const text = 'SELECT * FROM vendors WHERE id = $1';
    const result = await query(text, [id]);
    return result.rows[0];
  },

  update: async (id, vendorData) => {
    const { name, email, contactPerson, phone, address, notes } = vendorData;
    const text = `
      UPDATE vendors 
      SET name = $1, email = $2, contact_person = $3, phone = $4, address = $5, notes = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `;
    const values = [name, email, contactPerson, phone, address, notes, id];
    const result = await query(text, values);
    return result.rows[0];
  },

  delete: async (id) => {
    const text = 'DELETE FROM vendors WHERE id = $1';
    await query(text, [id]);
  }
};

// RFP-Vendor Mapping Methods
const rfpVendorDB = {
  linkVendorToRFP: async (rfpId, vendorId) => {
    const text = `
      INSERT INTO rfp_vendors (rfp_id, vendor_id, email_sent)
      VALUES ($1, $2, TRUE)
      ON CONFLICT (rfp_id, vendor_id) DO UPDATE SET sent_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    const result = await query(text, [rfpId, vendorId]);
    return result.rows[0];
  },

  getVendorsForRFP: async (rfpId) => {
    const text = `
      SELECT v.*, rv.sent_at, rv.email_sent
      FROM vendors v
      INNER JOIN rfp_vendors rv ON v.id = rv.vendor_id
      WHERE rv.rfp_id = $1
    `;
    const result = await query(text, [rfpId]);
    return result.rows;
  }
};

// Proposal Database Methods
const proposalDB = {
  create: async (proposalData) => {
    const { rfpId, vendorId, rawEmailContent, parsedData, totalPrice, deliveryTime, warrantyTerms, paymentTerms, specialConditions, aiScore, aiSummary, aiPros, aiCons } = proposalData;
    const text = `
      INSERT INTO proposals (rfp_id, vendor_id, raw_email_content, parsed_data, total_price, delivery_time, warranty_terms, payment_terms, special_conditions, ai_score, ai_summary, ai_pros, ai_cons)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (rfp_id, vendor_id) DO UPDATE
      SET raw_email_content = $3, parsed_data = $4, total_price = $5, delivery_time = $6, warranty_terms = $7, payment_terms = $8, special_conditions = $9, ai_score = $10, ai_summary = $11, ai_pros = $12, ai_cons = $13, received_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    const values = [rfpId, vendorId, rawEmailContent, JSON.stringify(parsedData), totalPrice, deliveryTime, warrantyTerms, paymentTerms, specialConditions, aiScore, aiSummary, aiPros, aiCons];
    const result = await query(text, values);
    return result.rows[0];
  },

  findByRFP: async (rfpId) => {
    const text = `
      SELECT p.*, v.name as vendor_name, v.email as vendor_email
      FROM proposals p
      INNER JOIN vendors v ON p.vendor_id = v.id
      WHERE p.rfp_id = $1
      ORDER BY p.ai_score DESC, p.total_price ASC
    `;
    const result = await query(text, [rfpId]);
    return result.rows;
  },

  findById: async (id) => {
    const text = 'SELECT * FROM proposals WHERE id = $1';
    const result = await query(text, [id]);
    return result.rows[0];
  }
};

module.exports = {
  query,
  pool,
  rfpDB,
  vendorDB,
  rfpVendorDB,
  proposalDB
};