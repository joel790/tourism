import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Destination.css";
import { BsSearch } from "react-icons/bs";

const Destination = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    setFilteredDestinations(
      filterDestinations(destinations, selectedCategory, searchTerm)
    );
  }, [destinations, selectedCategory, searchTerm]);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tours");
      setDestinations(response.data.data.tour);
      setFilteredDestinations(response.data.data.tour);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterDestinations = (destinations, category, searchTerm) => {
    let filtered = destinations;

    if (category !== "All") {
      filtered = filtered.filter(
        (destination) => destination.category === category
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((destination) =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const openDestinationModal = (destination) => {
   
  };

  return (
    <div className="MainDestination">
      <header className="TopNavigation">
        <div className="Logo">Explore</div>

        <div className="SearchContainer">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <BsSearch className="SearchIcon" />
        </div>

        <div className="FilterContainer">
          <label htmlFor="categoryFilter"></label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="All">All</option>
            <option value="International">International</option>
            <option value="Cultural">Cultural</option>
            <option value="Religious">Religious</option>
            <option value="National">National</option>
          </select>
        </div>
      </header>

      <div className="MainContent">
        {filteredDestinations.length === 0 && searchTerm !== "" && (
          <p>No results found! Search for other destinations</p>
        )}

        {filteredDestinations.map((destination) => (
          <div
            key={destination._id}
            className="DestinationCard"
            onClick={() => openDestinationModal(destination)}
          >
            <img
              src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/120936809.jpg?k=ede4437632dc04a911779bab335647366cc0179bcffbd83c3cea202e6681eb44&o=&hp=1"
              alt="destination"
            />
            <div className="Spans">
              <h3 className="dname">{destination.name}</h3>
              <p className="label">
                Category: <span>{destination.category}</span>
              </p>
              <p className="label">
                Location: <span>{destination.location}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destination;
