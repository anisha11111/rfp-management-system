AI-Powered RFP Management System

A full-stack web application that streamlines the Request for Proposal (RFP) process using AI to interpret natural language inputs, manage vendor communication via email, parse proposals, and intelligently compare vendor bids.

1. Project Setup
1.a. Prerequisites

Ensure the following tools are installed:

Node.js — v18+

npm — v8+

PostgreSQL — v14+

OpenAI API Key — for generating structured RFPs and evaluating proposals

Gmail App Password / SMTP Credentials — for automated email sending

IMAP Access — for receiving vendor proposals

1.b. Installation Steps
Backend Setup
cd backend
npm install
cp .env.example .env


Fill .env with:

Database credentials

OpenAI model + API key

Gmail/SMTP credentials

IMAP credentials

Start backend:

npm run dev


Backend runs at http://localhost:5000

Frontend Setup
cd frontend
npm install
cp .env.example .env
npm run dev


Frontend runs at http://localhost:5173

1.c. How to Configure Email Sending/Receiving
Sending Emails (SMTP)

Configure in backend/.env:

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com


For Gmail:

Turn on 2-Step Verification

Generate App Password

Use that password in .env (never your real Gmail password)

Receiving Emails (IMAP)

Configure in .env:

IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=your-email@gmail.com
IMAP_PASSWORD=your-app-password


The backend polls inbox → extracts proposal text → sends it to AI.

1.d. How to Run Everything Locally
Step 1 — Start database

Create database:

CREATE DATABASE rfp_management;

Step 2 — Start backend
cd backend
npm run dev

Step 3 — Start frontend
cd frontend
npm run dev

Step 4 — Open app

Visit:
➡ http://localhost:5173

1.e. Seed Data / Initial Scripts

No seed data required.

Vendor list can be pre-filled in frontend.

PostgreSQL schema auto-creates tables from backend models.

Demo vendor proposals can be submitted manually via API.

2. Tech Stack
2.a. Technologies Used
Frontend

React 18

Vite

TailwindCSS

Axios

Lucide Icons

Backend

Node.js + Express

PostgreSQL (pg library)

Nodemailer (SMTP)

IMAP for reading vendor replies

OpenAI GPT-4 Turbo for AI scoring and RFP structuring

AI

GPT-4 Turbo model
Used for:

Parsing RFP text

Extracting line items

Evaluating proposals

Scoring + summarizing vendors

3. API Documentation
3.a. Main Endpoints
1. Create RFP

POST /api/rfps

Generates a structured RFP from natural language.

Request:
{
  "naturalLanguageInput": "I need 20 laptops with 16GB RAM..."
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Office Equipment Procurement",
    "items": [...],
    "budget": 50000
  }
}

2. Get All RFPs

GET /api/rfps

3. Send RFP to Vendors

POST /api/rfps/:id/send

Body:
{
  "vendorIds": ["uuid1", "uuid2"]
}

4. Submit Proposal

POST /api/proposals

Body:
{
  "rfpId": "uuid",
  "vendorId": "uuid",
  "proposalText": "Our quote is..."
}

Response:
{
  "success": true,
  "data": {
    "aiScore": 85,
    "totalPrice": 45000,
    "aiSummary": "Strong pricing..."
  }
}

5. Compare Proposals

GET /api/rfps/:id/proposals/compare

Returns AI ranking, pros/cons, and best recommendation.

4. Decisions & Assumptions
4.a. Key Design Decisions

AI handles all natural-language parsing to reduce manual work.

Emails chosen for vendor communication to mimic real procurement workflows.

PostgreSQL used for structured + JSONB storage.

Proposal scoring criteria created based on common procurement standards:

Pricing

Technical compliance

Delivery timeline

Warranty

Proposal completeness

UI designed as a 3-step flow:

Create RFP

Select Vendors

Compare Proposals


4.b. Assumptions

Vendors reply to emails in simple text (AI can parse varied formats).

One proposal per vendor per RFP.

No file attachments (text-only proposals).

Internet is available for AI API calls.

Multi-user authentication not required for this version.


5. AI Tools Usage
5.a. Tools Used

ChatGPT


5.b. What They Helped With

Writing backend controllers

Designing React components

Creating Tailwind UI layouts

Email service logic

IMAP parsing logic

Debugging errors

Improving UI clarity

5.c. Notable Prompts / Approaches

Examples:

“Convert natural language procurement text into structured JSON.”

“Score proposals based on price, delivery, warranty, and completeness.”

“Generate a React comparison component with Tailwind CSS.”

“Explain how to parse IMAP email replies.”

5.d. What You Learned

How to integrate AI into real workflows

Secure handling of .env files and secrets

Structuring a full-stack AI-driven application

Email automation with SMTP + IMAP

Building scalable React components with Tailwind
