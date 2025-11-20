import React from 'react';

function Filters({
  location,
  onLocationChange,
  industry,
  onIndustryChange,
  locations,
  industries,
  sortBy,
  onSortByChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions,
  resultsCount
}) {
  return (
    <div className="filters">
      <div className="filters-row">
        
        {/* Location Filter */}
        <div className="field">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
          >
            <option value="all">All</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Industry Filter */}
        <div className="field">
          <label htmlFor="industry">Industry</label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => onIndustryChange(e.target.value)}
          >
            <option value="all">All</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div className="field">
          <label htmlFor="sort">Sort</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            <option value="name_asc">Name (A → Z)</option>
            <option value="name_desc">Name (Z → A)</option>
          </select>
        </div>

        {/* Page size */}
        <div className="field">
          <label htmlFor="pagesize">Page size</label>
          <select
            id="pagesize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Results Count */}
      <div className="filters-meta">
        <span>
          {resultsCount} result{resultsCount === 1 ? '' : 's'}
        </span>
      </div>
    </div>
  );
}

export default Filters;
