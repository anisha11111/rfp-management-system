-- AI-Powered RFP Management System Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- RFPs Table
CREATE TABLE rfps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    raw_input TEXT NOT NULL,
    budget DECIMAL(12, 2),
    delivery_deadline VARCHAR(100),
    payment_terms VARCHAR(100),
    warranty_requirement VARCHAR(100),
    items JSONB NOT NULL DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vendors Table
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contact_person VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RFP-Vendor Mapping (which vendors received which RFPs)
CREATE TABLE rfp_vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rfp_id UUID REFERENCES rfps(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email_sent BOOLEAN DEFAULT FALSE,
    UNIQUE(rfp_id, vendor_id)
);

-- Proposals Table
CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rfp_id UUID REFERENCES rfps(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    raw_email_content TEXT,
    parsed_data JSONB NOT NULL DEFAULT '{}',
    total_price DECIMAL(12, 2),
    delivery_time VARCHAR(100),
    warranty_terms VARCHAR(255),
    payment_terms VARCHAR(100),
    special_conditions TEXT,
    ai_score INTEGER CHECK (ai_score >= 0 AND ai_score <= 100),
    ai_summary TEXT,
    ai_pros TEXT,
    ai_cons TEXT,
    status VARCHAR(50) DEFAULT 'received',
    received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(rfp_id, vendor_id)
);

-- Indexes for performance
CREATE INDEX idx_rfps_status ON rfps(status);
CREATE INDEX idx_rfps_created_at ON rfps(created_at DESC);
CREATE INDEX idx_proposals_rfp_id ON proposals(rfp_id);
CREATE INDEX idx_proposals_vendor_id ON proposals(vendor_id);
CREATE INDEX idx_proposals_ai_score ON proposals(ai_score DESC);
CREATE INDEX idx_rfp_vendors_rfp_id ON rfp_vendors(rfp_id);
CREATE INDEX idx_rfp_vendors_vendor_id ON rfp_vendors(vendor_id);

-- Seed data for vendors
INSERT INTO vendors (name, email, contact_person, phone) VALUES
('TechCorp Solutions', 'sales@techcorp.com', 'John Smith', '+1-555-0101'),
('Global IT Supplies', 'quotes@globalit.com', 'Sarah Johnson', '+1-555-0102'),
('Premier Electronics', 'rfp@premierelec.com', 'Mike Chen', '+1-555-0103'),
('Digital Hardware Inc', 'procurement@digitalhw.com', 'Emily Davis', '+1-555-0104'),
('Enterprise Tech Partners', 'sales@entechpartners.com', 'Robert Wilson', '+1-555-0105');