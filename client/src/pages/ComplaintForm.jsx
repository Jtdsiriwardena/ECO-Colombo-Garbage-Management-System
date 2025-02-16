import { useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import Swal from "sweetalert2";

const ComplaintForm = ({ user }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Complaint Submitted!",
      text: "Your complaint has been successfully submitted. We will address it soon.",
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#38a169",
    });

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in first.");
      return;
    }

    

    const formData = new FormData();
    formData.append("location", JSON.stringify(location));
    formData.append("description", description);
    formData.append("image", image);
    formData.append("area", area);
    formData.append("username", user.username);
    formData.append("email", user.email);

    try {
      await axios.post(
        "http://localhost:5000/api/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Complaint submitted successfully!");
      setLocation({ lat: null, lng: null });
      setImage(null);
      setDescription("");
      setArea("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint.");
    }
  };

  const handleMapClick = (event) => {
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (

    <div className="max-w-screen-lg mx-auto py-16 px-6">

      <div className="">
        {error && <p className="text-red-600 text-center">{error}</p>}
        {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
      </div>


      <form onSubmit={handleSubmit} className="space-y-12">


        <div className="bg-white  grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Step 1: Describe the issue */}
          <div className="shadow-lg p-8 rounded-xl ">
            <h2 className="font-semibold text-2xl text-gray-800 mb-6">Step 1: Describe the issue</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe the issue..."
              rows={4}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Step 2: Select Area & Upload Image */}
          <div className="shadow-lg p-8 rounded-xl ">
            <h2 className="font-semibold text-2xl text-gray-800 mb-6">Step 2: Select Area & Upload Image</h2>


            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
              className="w-full p-4 mb-6 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">Select an area</option>
              <option value="Kotuwa">Kotuwa</option>
              <option value="Kollupitiya">Kollupitiya</option>
              <option value="Bambalapitiya">Bambalapitiya</option>
              <option value="Borella">Borella</option>
              <option value="Maradana">Maradana</option>
              <option value="Nugegoda">Nugegoda</option>
              <option value="Dehiwala">Dehiwala</option>
              <option value="Mount Lavinia">Mount Lavinia</option>
              <option value="Ratmalana">Ratmalana</option>
              <option value="Wellawatte">Wellawatte</option>
              <option value="Kirulapone">Kirulapone</option>
              <option value="Rajagiriya">Rajagiriya</option>
            </select>

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

        </div>

        {/* Step 3: Select Location on Map (Full width) */}
        <div className="bg-white rounded-xl shadow-lg p-8 w-full">
          <h2 className="font-semibold text-2xl text-gray-800 mb-6">Step 3: Select Location on Map</h2>
          <LoadScript googleMapsApiKey="AIzaSyDKo47VQpTFtD9jXhJH7V8p_7FrcXbJtTs">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "300px" }}
              center={{ lat: 6.9271, lng: 79.8612 }}
              zoom={12}
              onClick={handleMapClick}
              className="rounded-xl shadow-md"
            >
              {location.lat && location.lng && (
                <Marker position={{ lat: location.lat, lng: location.lng }} />
              )}
            </GoogleMap>
          </LoadScript>
        </div>


        <div className="mt-6 text-center">
    <button
      type="button"
      onClick={handleSubmit}
      className="px-8 py-3 bg-white text-green border border-green-800 hover:bg-green-700 focus:ring-2 focus:ring-white hover:text-white transition duration-300"
    >
      Submit Complaint
    </button>
  </div>
      </form>



    </div>

  );
};

// PropTypes validation
ComplaintForm.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default ComplaintForm;
