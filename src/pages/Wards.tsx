import React from 'react';

const Wards = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Hospital Wards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder content for the Wards page */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">General Ward</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Total Beds: 20</p>
            <p className="text-gray-600">Available Beds: 8</p>
            <p className="text-gray-600">Occupancy Rate: 60%</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">ICU</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Total Beds: 10</p>
            <p className="text-gray-600">Available Beds: 3</p>
            <p className="text-gray-600">Occupancy Rate: 70%</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pediatric Ward</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Total Beds: 15</p>
            <p className="text-gray-600">Available Beds: 6</p>
            <p className="text-gray-600">Occupancy Rate: 60%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wards;