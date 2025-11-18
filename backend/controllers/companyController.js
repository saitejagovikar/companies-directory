const Company = require('../models/Company');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
  try {
    const { search, industry } = req.query;
    const query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (industry) {
      query.industry = new RegExp(industry, 'i');
    }
    
    const companies = await Company.find(query).sort({ name: 1 });
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a company
// @route   POST /api/companies
// @access  Private/Admin
const createCompany = async (req, res) => {
  try {
    const { name, location, industry, website, logo, description } = req.body;
    
    const company = new Company({
      name,
      location,
      industry,
      website,
      logo,
      description
    });
    
    const createdCompany = await company.save();
    res.status(201).json(createdCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Private/Admin
const updateCompany = async (req, res) => {
  try {
    const { name, location, industry, website, logo, description } = req.body;
    
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    company.name = name || company.name;
    company.location = location || company.location;
    company.industry = industry || company.industry;
    company.website = website || company.website;
    company.logo = logo || company.logo;
    company.description = description || company.description;
    
    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Private/Admin
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    await company.remove();
    res.json({ message: 'Company removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all industries
// @route   GET /api/companies/industries
// @access  Public
const getIndustries = async (req, res) => {
  try {
    const industries = await Company.distinct('industry');
    res.json(industries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getIndustries
};
