const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getIndustries
} = require('../controllers/companyController');

// Public routes
router.get('/', getCompanies);
router.get('/industries', getIndustries);
router.get('/:id', getCompanyById);

// Protected routes (add authentication middleware later)
router.post('/', createCompany);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

module.exports = router;
