// Run this ONCE after npm install to fill your database with initial data
// Command: node seeders/seed.js

require('dotenv').config();
const { sequelize, Shop, Mess, Note, Placement, User } = require('../models');
const bcrypt = require('bcryptjs');

async function seed() {
  await sequelize.sync({ force: true });  // WARNING: drops and recreates all tables
  console.log('Tables created fresh...');

  // ── Admin user ──────────────────────────────────────────────
  await User.create({
    name: 'Admin',
    email: 'admin@gla.ac.in',
    password: 'admin123',    // will be hashed by beforeCreate hook
    role: 'admin',
    isPremium: true,
  });
  console.log('✅ Admin user created  →  email: admin@gla.ac.in  password: admin123');

  // ── Inside Campus Shops ──────────────────────────────────────
  await Shop.bulkCreate([
    {
      name: 'Main Campus Canteen',
      description: 'The big canteen near the admin block. Rajma chawal is legendary here.',
      category: 'canteen', location: 'inside',
      address: 'Near Admin Block, GLA Campus',
      phone: '9876500001', whatsapp: '9876500001',
      timings: '8:00 AM – 9:00 PM',
      isVeg: true, deliveryAvailable: false, isOpen: true,
      emoji: '🍛', tags: 'thali,rajma,dal,rice',
      avgRating: 4.1, reviewCount: 142, girlsFriendly: true,
    },
    {
      name: 'Juice & Shake Corner',
      description: 'Fresh juices, shakes, and cold drinks near the library.',
      category: 'juice', location: 'inside',
      address: 'Near Central Library, GLA Campus',
      phone: '9876500002', whatsapp: '9876500002',
      timings: '9:00 AM – 8:00 PM',
      isVeg: true, deliveryAvailable: false, isOpen: true,
      emoji: '🧃', tags: 'juice,shake,cold drink',
      avgRating: 4.7, reviewCount: 89, girlsFriendly: true,
    },
    {
      name: 'Chai & Snacks Stall',
      description: 'Best chai on campus. Also samosa, bread pakoda, biscuits.',
      category: 'tea', location: 'inside',
      address: 'Gate 2 Area, GLA Campus',
      phone: '9876500003', whatsapp: null,
      timings: '7:00 AM – 10:00 PM',
      isVeg: true, deliveryAvailable: false, isOpen: true,
      emoji: '☕', tags: 'chai,tea,samosa,snacks',
      avgRating: 4.3, reviewCount: 210, girlsFriendly: true,
    },
    {
      name: 'Noodle Wali Didi',
      description: 'Maggi, chowmein, pasta. Quick fix for late evenings.',
      category: 'noodles', location: 'inside',
      address: 'Boys Hostel Side, GLA Campus',
      phone: '9876500004', whatsapp: '9876500004',
      timings: '4:00 PM – 11:00 PM',
      isVeg: true, deliveryAvailable: false, isOpen: false,
      emoji: '🍜', tags: 'noodles,maggi,chowmein,pasta',
      avgRating: 4.0, reviewCount: 61, girlsFriendly: true,
    },
    {
      name: 'Burger & Fries Stall',
      description: 'Veg burgers, fries, momos. Student favourite after labs.',
      category: 'fastfood', location: 'inside',
      address: 'Near CSE Block, GLA Campus',
      phone: '9876500005', whatsapp: '9876500005',
      timings: '11:00 AM – 9:00 PM',
      isVeg: true, deliveryAvailable: false, isOpen: true,
      emoji: '🍔', tags: 'burger,fries,momos,fastfood',
      avgRating: 3.8, reviewCount: 77, girlsFriendly: true,
    },
  ]);
  console.log('✅ Inside campus shops created');

  // ── Outside Campus Shops ──────────────────────────────────────
  await Shop.bulkCreate([
    {
      name: 'Sharma Dhaba',
      description: 'Classic dhaba outside East Gate. Dal makhani and roti are must try.',
      category: 'meals', location: 'outside',
      address: 'East Gate Road, 200m from GLA',
      phone: '9876500006', whatsapp: '9876500006',
      timings: '7:00 AM – 11:00 PM',
      isVeg: false, deliveryAvailable: true, isOpen: true,
      emoji: '🍽️', tags: 'dal,roti,thali,delivery',
      avgRating: 4.2, reviewCount: 95, girlsFriendly: false,
    },
    {
      name: 'Pizza Point',
      description: 'Affordable pizza and pasta. Takes WhatsApp orders for delivery to campus.',
      category: 'fastfood', location: 'outside',
      address: 'Main Road, 400m from GLA Main Gate',
      phone: '9876500007', whatsapp: '9876500007',
      timings: '11:00 AM – 11:00 PM',
      isVeg: true, deliveryAvailable: true, isOpen: true,
      emoji: '🍕', tags: 'pizza,pasta,delivery',
      avgRating: 3.9, reviewCount: 53, girlsFriendly: true,
    },
    {
      name: 'Chole Bhature Corner',
      description: 'Famous for piping hot chole bhature. Breakfast crowd favourite.',
      category: 'meals', location: 'outside',
      address: 'Near Bus Stand, Mathura Road',
      phone: '9876500008', whatsapp: null,
      timings: '7:00 AM – 2:00 PM',
      isVeg: true, deliveryAvailable: false, isOpen: true,
      emoji: '🥘', tags: 'chole,bhature,breakfast',
      avgRating: 4.5, reviewCount: 118, girlsFriendly: true,
    },
  ]);
  console.log('✅ Outside campus shops created');

  // ── Mess Options ──────────────────────────────────────────────
  await Mess.bulkCreate([
    {
      name: 'Annapurna Tiffin Service',
      address: '200m from East Gate, Near Hanuman Temple',
      phone: '9876500010',
      timings: '7:00 AM – 10:00 PM',
      isVeg: true, pricePerMeal: 50, monthlyPrice: 2200,
      girlsPreferred: true, emoji: '🏠',
      description: 'Home-style veg food. Daal, sabzi, roti, rice, papad. Monthly subscription available. Highly preferred by hostel girls.',
      avgRating: 4.4, reviewCount: 67,
    },
    {
      name: 'Sai Bhoj Mess',
      address: '500m from Main Gate, Govind Nagar',
      phone: '9876500011',
      timings: '7:00 AM – 9:30 PM',
      isVeg: false, pricePerMeal: 45, monthlyPrice: 1900,
      girlsPreferred: false, emoji: '🍲',
      description: 'Budget-friendly mess with veg and non-veg options. Most affordable near campus.',
      avgRating: 3.9, reviewCount: 44,
    },
    {
      name: 'Maa Ka Khana',
      address: 'Lane 3, Krishna Nagar, 600m from West Gate',
      phone: '9876500012',
      timings: '8:00 AM – 9:00 PM',
      isVeg: true, pricePerMeal: 60, monthlyPrice: 2500,
      girlsPreferred: true, emoji: '🥗',
      description: 'Premium home-cooked food. Fresh roti, seasonal vegetables, dahi, salad. WhatsApp orders accepted.',
      avgRating: 4.6, reviewCount: 31,
    },
  ]);
  console.log('✅ Mess options created');

  // ── Notes & PYQs ──────────────────────────────────────────────
  await Note.bulkCreate([
    { title: 'DBMS Complete Notes', subject: 'DBMS', semester: 5, type: 'notes', isPremium: false, fileUrl: null, downloads: 412 },
    { title: 'Computer Networks Notes', subject: 'CN', semester: 5, type: 'notes', isPremium: false, fileUrl: null, downloads: 301 },
    { title: 'Maths 1 Full Notes', subject: 'Mathematics-I', semester: 1, type: 'notes', isPremium: false, fileUrl: null, downloads: 890 },
    { title: 'Data Structures Notes', subject: 'DSA', semester: 3, type: 'notes', isPremium: false, fileUrl: null, downloads: 654 },
    { title: 'OS PYQ 2019–2023', subject: 'Operating Systems', semester: 4, type: 'pyq', isPremium: true, fileUrl: null, downloads: 287 },
    { title: 'DSA PYQ + Solutions', subject: 'DSA', semester: 3, type: 'pyq', isPremium: true, fileUrl: null, downloads: 198 },
    { title: 'DBMS PYQ 5 Years', subject: 'DBMS', semester: 5, type: 'pyq', isPremium: true, fileUrl: null, downloads: 341 },
    { title: 'Interview Prep — HR + Tech', subject: 'Placement', semester: 8, type: 'other', isPremium: true, fileUrl: null, downloads: 523 },
  ]);
  console.log('✅ Notes & PYQs created');

  // ── Placements ─────────────────────────────────────────────────
  await Placement.bulkCreate([
    {
      company: 'TCS NQT 2024', role: 'Assistant System Engineer',
      branches: 'CS,IT,ECE,EE,ME', ctc: '3.6 LPA', cgpaCutoff: 6.0,
      deadline: '2024-10-15', status: 'open', type: 'oncampus',
      applyLink: 'https://nextstep.tcs.com', isPremium: false,
      description: 'TCS National Qualifier Test for all engineering branches.',
    },
    {
      company: 'Infosys SP', role: 'Systems Engineer',
      branches: 'CS,IT,ECE', ctc: '3.6–4.5 LPA', cgpaCutoff: 6.5,
      deadline: '2024-11-20', status: 'coming', type: 'oncampus',
      applyLink: null, isPremium: false,
      description: 'Infosys Systems Engineer and SP track. Watch for official email.',
    },
    {
      company: 'Wipro NLTH', role: 'Project Engineer',
      branches: 'CS,IT,ECE,EE', ctc: '3.5 LPA', cgpaCutoff: 6.0,
      deadline: '2024-12-01', status: 'coming', type: 'oncampus',
      applyLink: null, isPremium: false,
      description: 'Wipro National Level Talent Hunt. Online test followed by HR round.',
    },
    {
      company: 'Wipro Interview Experience', role: 'Real experience — GLA Batch 2023',
      branches: 'CS,IT', ctc: null, cgpaCutoff: null,
      deadline: null, status: 'open', type: 'oncampus',
      applyLink: null, isPremium: true,
      description: 'Step-by-step interview experience shared by GLA students who got placed in Wipro 2023.',
    },
  ]);
  console.log('✅ Placement data created');

  console.log('\n🎉 Database seeded successfully!');
  console.log('👉 Admin login: admin@gla.ac.in / admin123');
  process.exit(0);
}

seed().catch(e => { console.error('Seed failed:', e.message); process.exit(1); });
