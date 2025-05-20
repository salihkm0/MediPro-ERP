import React, { useState } from 'react';

const Wards = () => {
  // Sample data for wards and rooms
  const [wards, setWards] = useState([
    {
      id: 1,
      name: 'General Ward',
      rooms: [
        { id: 101, type: 'Standard', capacity: 2, available: true, patients: [], private: false },
        { id: 102, type: 'Standard', capacity: 2, available: false, patients: ['John Doe', 'Jane Smith'], private: false },
        { id: 103, type: 'Private', capacity: 1, available: true, patients: [], private: true },
        { id: 104, type: 'Deluxe', capacity: 1, available: true, patients: [], private: true, amenities: ['TV', 'Private Bath', 'Fridge'] },
      ],
      totalBeds: 20,
      availableBeds: 8
    },
    {
      id: 2,
      name: 'ICU',
      rooms: [
        { id: 201, type: 'ICU', capacity: 1, available: false, patients: ['Robert Johnson'], private: false },
        { id: 202, type: 'Private ICU', capacity: 1, available: true, patients: [], private: true },
        { id: 203, type: 'ICU', capacity: 1, available: false, patients: ['Emily Davis'], private: false },
      ],
      totalBeds: 10,
      availableBeds: 3
    },
    {
      id: 3,
      name: 'Pediatric Ward',
      rooms: [
        { id: 301, type: 'Family', capacity: 4, available: true, patients: [], private: false },
        { id: 302, type: 'Standard', capacity: 2, available: false, patients: ['Michael Wilson', 'Sarah Wilson'], private: false },
        { id: 303, type: 'Private Pediatric', capacity: 1, available: true, patients: [], private: true, amenities: ['Child Bed', 'Play Area'] },
      ],
      totalBeds: 15,
      availableBeds: 6
    }
  ]);

  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: '',
    admissionDate: '',
    condition: '',
    privateRequested: false
  });
  const [newRoom, setNewRoom] = useState({
    type: 'Standard',
    capacity: 2,
    private: false,
    amenities: []
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [showPrivateOnly, setShowPrivateOnly] = useState(false);
  const [showStandardOnly, setShowStandardOnly] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState('');

  // Calculate occupancy rate
  const calculateOccupancy = (ward) => {
    return Math.round(((ward.totalBeds - ward.availableBeds) / ward.totalBeds) * 100);
  };

  // Filter rooms based on selection
  const filteredRooms = selectedWard 
    ? selectedWard.rooms.filter(room => {
        if (showPrivateOnly) return room.private;
        if (showStandardOnly) return !room.private;
        return true;
      })
    : [];

  // Handle ward selection
  const handleWardSelect = (ward) => {
    setSelectedWard(ward);
    setSelectedRoom(null);
    setShowBookingForm(false);
    setShowRoomForm(false);
    setShowPrivateOnly(false);
    setShowStandardOnly(false);
  };

  // Handle room selection
  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setShowBookingForm(false);
    setShowRoomForm(false);
  };

  // Handle booking form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle room form input changes
  const handleRoomInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewRoom(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Add amenity to new room
  const addAmenity = () => {
    if (currentAmenity.trim() && !newRoom.amenities.includes(currentAmenity.trim())) {
      setNewRoom(prev => ({
        ...prev,
        amenities: [...prev.amenities, currentAmenity.trim()]
      }));
      setCurrentAmenity('');
    }
  };

  // Remove amenity from new room
  const removeAmenity = (amenity) => {
    setNewRoom(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  // Book a room
  const bookRoom = () => {
    if (!newPatient.name) {
      alert('Please enter patient name');
      return;
    }

    const updatedWards = wards.map(ward => {
      if (ward.id === selectedWard.id) {
        const updatedRooms = ward.rooms.map(room => {
          if (room.id === selectedRoom.id) {
            const updatedPatients = [...room.patients, newPatient.name];
            const updatedAvailable = updatedPatients.length < room.capacity;
            return {
              ...room,
              patients: updatedPatients,
              available: updatedAvailable
            };
          }
          return room;
        });

        // Update available beds count
        const occupiedBeds = updatedRooms.reduce((acc, room) => acc + room.patients.length, 0);
        const updatedAvailableBeds = ward.totalBeds - occupiedBeds;

        return {
          ...ward,
          rooms: updatedRooms,
          availableBeds: updatedAvailableBeds
        };
      }
      return ward;
    });

    setWards(updatedWards);
    setNewPatient({ name: '', admissionDate: '', condition: '', privateRequested: false });
    setShowBookingForm(false);
    alert(`Room ${selectedRoom.id} booked for ${newPatient.name}`);
  };

  // Add a new room
  const addRoom = () => {
    if (!newRoom.type || !newRoom.capacity) {
      alert('Please fill all required fields');
      return;
    }

    const updatedWards = wards.map(ward => {
      if (ward.id === selectedWard.id) {
        // Generate new room ID (simple increment for demo)
        const newRoomId = Math.max(...ward.rooms.map(r => r.id), 0) + 1;
        
        const roomToAdd = {
          id: newRoomId,
          type: newRoom.type,
          capacity: parseInt(newRoom.capacity),
          available: true,
          patients: [],
          private: newRoom.private,
          ...(newRoom.amenities.length > 0 && { amenities: [...newRoom.amenities] })
        };

        const updatedRooms = [...ward.rooms, roomToAdd];
        
        // Update total beds count
        const updatedTotalBeds = ward.totalBeds + parseInt(newRoom.capacity);
        const updatedAvailableBeds = ward.availableBeds + parseInt(newRoom.capacity);

        return {
          ...ward,
          rooms: updatedRooms,
          totalBeds: updatedTotalBeds,
          availableBeds: updatedAvailableBeds
        };
      }
      return ward;
    });

    setWards(updatedWards);
    setNewRoom({
      type: 'Standard',
      capacity: 2,
      private: false,
      amenities: []
    });
    setShowRoomForm(false);
    alert(`New ${newRoom.private ? 'private' : ''} room added to ${selectedWard.name}`);
  };

  // Discharge patient
  const dischargePatient = (patientName) => {
    const updatedWards = wards.map(ward => {
      if (ward.id === selectedWard.id) {
        const updatedRooms = ward.rooms.map(room => {
          if (room.patients.includes(patientName)) {
            const updatedPatients = room.patients.filter(p => p !== patientName);
            return {
              ...room,
              patients: updatedPatients,
              available: true
            };
          }
          return room;
        });

        // Update available beds count
        const occupiedBeds = updatedRooms.reduce((acc, room) => acc + room.patients.length, 0);
        const updatedAvailableBeds = ward.totalBeds - occupiedBeds;

        return {
          ...ward,
          rooms: updatedRooms,
          availableBeds: updatedAvailableBeds
        };
      }
      return ward;
    });

    setWards(updatedWards);
    alert(`${patientName} discharged from room ${selectedRoom.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hospital Wards Management</h1>
      
      {/* Wards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {wards.map(ward => (
          <div 
            key={ward.id} 
            className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-lg ${selectedWard?.id === ward.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => handleWardSelect(ward)}
          >
            <h2 className="text-xl font-semibold mb-4">{ward.name}</h2>
            <div className="space-y-2">
              <p className="text-gray-600">Total Beds: {ward.totalBeds}</p>
              <p className="text-gray-600">Available Beds: {ward.availableBeds}</p>
              <p className="text-gray-600">Occupancy Rate: {calculateOccupancy(ward)}%</p>
              <p className="text-gray-600">
                Rooms: {ward.rooms.length} 
                <span className="ml-2 text-purple-600">({ward.rooms.filter(r => r.private).length} private)</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Room Details Section */}
      {selectedWard && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{selectedWard.name} Rooms</h2>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded ${showPrivateOnly ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'}`}
                onClick={() => {
                  setShowPrivateOnly(!showPrivateOnly);
                  setShowStandardOnly(false);
                }}
              >
                Private Only
              </button>
              <button 
                className={`px-3 py-1 rounded ${showStandardOnly ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
                onClick={() => {
                  setShowStandardOnly(!showStandardOnly);
                  setShowPrivateOnly(false);
                }}
              >
                Standard Only
              </button>
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={() => {
                  setShowRoomForm(true);
                  setSelectedRoom(null);
                  setShowBookingForm(false);
                }}
              >
                Add New Room
              </button>
              <button 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={() => {
                  setSelectedWard(null);
                  setSelectedRoom(null);
                  setShowBookingForm(false);
                  setShowRoomForm(false);
                }}
              >
                Back to Wards
              </button>
            </div>
          </div>

          {/* Add Room Form */}
          {showRoomForm && (
            <div className="mb-6 border-b pb-6">
              <h3 className="text-lg font-medium mb-4">Add New Room to {selectedWard.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type*</label>
                  <input
                    type="text"
                    name="type"
                    value={newRoom.type}
                    onChange={handleRoomInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Standard, Private, ICU"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity*</label>
                  <select
                    name="capacity"
                    value={newRoom.capacity}
                    onChange={handleRoomInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privateRoom"
                    name="private"
                    checked={newRoom.private}
                    onChange={handleRoomInputChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privateRoom" className="ml-2 block text-sm text-gray-700">
                    Private Room
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (for private rooms)</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={currentAmenity}
                      onChange={(e) => setCurrentAmenity(e.target.value)}
                      className="flex-1 p-2 border rounded-l"
                      placeholder="Add amenity (e.g., TV, Private Bath)"
                      onKeyPress={(e) => e.key === 'Enter' && addAmenity()}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
                      onClick={addAmenity}
                    >
                      Add
                    </button>
                  </div>
                  {newRoom.amenities.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newRoom.amenities.map((amenity, index) => (
                        <span key={index} className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                          {amenity}
                          <button 
                            type="button" 
                            className="ml-1 text-gray-500 hover:text-gray-700"
                            onClick={() => removeAmenity(amenity)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  onClick={() => setShowRoomForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  onClick={addRoom}
                >
                  Create Room
                </button>
              </div>
            </div>
          )}

          {/* Rooms List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredRooms.map(room => (
              <div 
                key={room.id} 
                className={`border rounded-lg p-4 cursor-pointer transition-all ${room.private ? 'border-purple-300 bg-purple-50' : room.available ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} ${selectedRoom?.id === room.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => handleRoomSelect(room)}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium">Room {room.id}</h3>
                  {room.private && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Private</span>
                  )}
                </div>
                <p>Type: {room.type}</p>
                <p>Capacity: {room.capacity}</p>
                <p>Status: {room.available ? 'Available' : 'Occupied'}</p>
                {room.amenities && (
                  <p className="text-sm text-gray-600 mt-1">
                    Amenities: {room.amenities.join(', ')}
                  </p>
                )}
                {room.patients.length > 0 && (
                  <p className="text-sm text-gray-600">Patients: {room.patients.length}/{room.capacity}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Room Details and Patient Management */}
      {selectedRoom && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Room {selectedRoom.id} Details</h2>
              {selectedRoom.private && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">Private Room</span>
              )}
            </div>
            <div className="space-x-2">
              {selectedRoom.available && (
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => setShowBookingForm(true)}
                >
                  Book Room
                </button>
              )}
              <button 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={() => {
                  setSelectedRoom(null);
                  setShowBookingForm(false);
                }}
              >
                Back to Rooms
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Room Information</h3>
              <ul className="space-y-2">
                <li><strong>Type:</strong> {selectedRoom.type}</li>
                <li><strong>Capacity:</strong> {selectedRoom.capacity}</li>
                <li><strong>Status:</strong> {selectedRoom.available ? 'Available' : 'Occupied'}</li>
                <li><strong>Ward:</strong> {selectedWard.name}</li>
                {selectedRoom.amenities && (
                  <li>
                    <strong>Amenities:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {selectedRoom.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Current Patients ({selectedRoom.patients.length})</h3>
              {selectedRoom.patients.length > 0 ? (
                <ul className="space-y-2">
                  {selectedRoom.patients.map((patient, index) => (
                    <li key={index} className="flex justify-between items-center border-b pb-2">
                      <span>{patient}</span>
                      <button 
                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition"
                        onClick={() => dischargePatient(patient)}
                      >
                        Discharge
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No patients currently in this room</p>
              )}
            </div>
          </div>

          {/* Booking Form */}
          {showBookingForm && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Book Room {selectedRoom.id}</h3>
              {selectedRoom.private && (
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
                  <p className="font-medium text-purple-800">This is a private room</p>
                  <p className="text-sm text-purple-700">Additional charges may apply for private accommodations.</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={newPatient.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter patient name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Date</label>
                  <input
                    type="date"
                    name="admissionDate"
                    value={newPatient.admissionDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition/Reason</label>
                  <textarea
                    name="condition"
                    value={newPatient.condition}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder="Enter patient condition or admission reason"
                  />
                </div>
                {!selectedRoom.private && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privateRequested"
                      name="privateRequested"
                      checked={newPatient.privateRequested}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="privateRequested" className="ml-2 block text-sm text-gray-700">
                      Request private room (if available)
                    </label>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  onClick={() => setShowBookingForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={bookRoom}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Wards;