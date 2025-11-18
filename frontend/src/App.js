import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filters from './components/Filters';
import CompanyCard from './components/CompanyCard';
import Hero from './components/Hero';
import SkeletonCard from './components/SkeletonCard';
import Footer from './components/Footer';

const API_URL = 'http://localhost:5003/api/companies'; // Using full backend URL

const PAGE_SIZE_OPTIONS = [6, 9, 12];


function App() {
  // Core state management
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and search state
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('all');
  const [industry, setIndustry] = useState('all');
  const [sortBy, setSortBy] = useState('name_asc');
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCompanies(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load companies:', err);
        setError('Failed to load companies. Please make sure the backend server is running.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanies();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, location, industry, sortBy, pageSize]);

  const locations = useMemo(() => {
    const map = new Map();
    companies.forEach(c => { 
      if (c.location) {
        // Use the location as the key, but append count if it's a duplicate
        let count = 1;
        let key = c.location;
        while (map.has(key)) {
          key = `${c.location} (${count++})`;
        }
        // Store the original value but show the unique key
        map.set(key, c.location);
      }
    });
    return Array.from(map.entries());
  }, [companies]);

  const industries = useMemo(() => {
    const map = new Map();
    companies.forEach(c => { 
      if (c.industry) {
        // Use the industry as the key, but append count if it's a duplicate
        let count = 1;
        let key = c.industry;
        while (map.has(key)) {
          key = `${c.industry} (${count++})`;
        }
        // Store the original value but show the unique key
        map.set(key, c.industry);
      }
    });
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [companies]);

  // Filtering and sorting logic
  const filtered = useMemo(() => {
    // Start with a fresh copy of companies
    let items = companies.slice();
    
    // Apply search filter (case-insensitive)
    const q = search.trim().toLowerCase();
    if (q) {
      items = items.filter(c =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    }
    
    // Apply location filter
    if (location !== 'all') {
      items = items.filter(c => c.location === location);
    }
    
    // Apply industry filter
    if (industry !== 'all') {
      items = items.filter(c => c.industry === industry);
    }
    
    // Apply sorting
    if (sortBy === 'name_asc') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      items.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    return items;
  }, [companies, search, location, industry, sortBy]);

  // Calculate pagination values
  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const pageItems = filtered.slice(pageStart, pageStart + pageSize);

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="app">
        <Hero search={search} onSearchChange={setSearch} />
        <div className="container">
          <div className="layout">
            <main className="main">
              <div className="filters skeleton-filters">
                <div className="skeleton-filter"></div>
                <div className="skeleton-filter"></div>
                <div className="skeleton-filter"></div>
                <div className="skeleton-filter"></div>
              </div>
              <h1 className="title skeleton-title">Companies Directory</h1>
              <SkeletonCard count={6} />
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Show error message if data loading fails
  if (error) {
    return (
      <div className="app">
        <Hero search={search} onSearchChange={setSearch} />
        <div className="container">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Hero search={search} onSearchChange={setSearch} />
      <div className="container">
        <div className="layout">
          <main className="main">
            <Filters
              location={location}
              onLocationChange={setLocation}
              industry={industry}
              onIndustryChange={setIndustry}
              locations={locations}
              industries={industries}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              resultsCount={filtered.length}
            />
            <h1 className="title">Companies Directory</h1>
            {filtered.length === 0 && (
              <div className="state state-empty">
              <span>No results found 😕 <br />Try adjusting your filters</span>
              </div>
            )}
            {filtered.length > 0 && (
              <>
                <div className="grid">
                  {pageItems.map((company, index) => (
                    <CompanyCard 
                      key={`${company.id || 'company'}-${company.name?.replace(/\s+/g, '-').toLowerCase() || index}`} 
                      company={company} 
                    />
                  ))}
                </div>
                <div className="pagination">
                  <button
                    className="button"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  <span className="page-info">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="button"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
