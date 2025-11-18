require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Company = require('./models/Company');

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB for data import'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Read and parse the companies data
const companiesData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../src/data/companies.json'),
    'utf-8'
  )
);

// Import data to MongoDB
const importData = async () => {
  try {
    // Clear existing data
    await Company.deleteMany({});
    console.log('Cleared existing companies data');

    // Process and import data
    const companiesToImport = companiesData.map(company => {
      // Remove the numeric id since MongoDB will create its own _id
      const { id, ...companyData } = company;
      return companyData;
    });
    
    const companies = await Company.insertMany(companiesToImport);
    console.log(`Successfully imported ${companies.length} companies`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Execute the import
importData();
