import { useEffect, useState } from "react";
import axios from "axios";
import ComplaintForm from "./ComplaintForm";
import { Link } from "react-router-dom";
import userHome from "../images/user_home.jpg";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(null);


  const faqData = [
    {
      question: 'What is Eco Colombo?',
      answer: 'Eco Colombo is a waste management service initiated by the Colombo Municipal Council. We are dedicated to making Colombo a cleaner, greener, and more sustainable city by providing efficient waste collection and disposal services.',
    },
    {
      question: 'What areas are covered by ECO Colombo?',
      answer: 'Eco Colombo provides waste management services to all local authorities within the Colombo district',
    },
    {
      question: 'How do I submit a complaint?',
      answer: 'To submit a complaint, go to the "Submit Your Complaint" section and Follow the provided steps',
    },
    {
      question: 'What are Eco Colombo goals?',
      answer: 'Improve the cleanliness and environmental health of Colombo and Promote sustainable waste management practices',
    },


  ];

  const toggleAnswer = (index) => {
    setOpen(open === index ? null : index);
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const { data } = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data.");
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <nav className="bg-white p-4 w-full fixed top-0 left-0 z-50 shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1
            className="text-3xl font-black tracking-wider text-transparent bg-clip-text uppercase bg-gradient-to-r from-green-500 to-green-900 drop-shadow-md"
            style={{
              fontFamily: 'YourCustomFont, sans-serif',
              WebkitBackgroundClip: 'text',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            ECO Colombo
          </h1>

          <div className="flex items-center space-x-6">
            {[
              { to: "/view-complaints", label: "My Complaints" },
              { to: "/", label: "About Us" },
              { to: "/", label: "FAQ" },
              { to: "/", label: "Contact Us" }
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="relative group text-green-800 px-4 py-2 rounded-sm transition-all duration-300"
              >
                <span className="relative z-10">{label}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
          </div>
        </div>
      </nav>




      <header
        className="relative bg-cover bg-center text-white text-center h-screen"
        style={{
          backgroundImage: `url(${userHome}), url(/path-to-secondary-image.jpg)`,
          backgroundSize: "cover, contain",
          backgroundPosition: "center, center",
        }}
      >

        <div className="absolute inset-0 bg-gradient-to-t from-green-700 to-transparent"></div>


        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <h2 className="text-4xl md:text-5xl font-bold animate__animated animate__fadeIn">
            Welcome to ECO Colombo
          </h2>
          <p className="mt-4 text-lg md:text-xl animate__animated animate__fadeIn animate__delay-1s">
            Together, let’s create a cleaner and greener city for everyone!
          </p>
          <div className="mt-8">
            <Link
              to="/join-us"
              className="px-6 py-2 border border-white text-white rounded-md hover:bg-white hover:text-green-800"
            >
              Join Us
            </Link>
          </div>
        </div>
      </header>







      <div className="flex flex-col justify-start items-start flex-grow">



        {error && <p className="text-red-500 mb-4">{error}</p>}


        {user && (
          <div className="bg-white p-6 rounded shadow-md w-full">

            <h2 className="text-3xl font-semibold  text-green-700 text-center tracking-widest uppercase mt-8">
              Submit Your Complaint
            </h2>


            <ComplaintForm user={user} />
          </div>

        )}
      </div>

      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 gap-x-24">


            <div className="flex-1">
              <h2 className="text-3xl font-semibold  text-green-700 text-center tracking-widest uppercase mt-8 mb-8">About Us</h2>
              <p className="text-lg text-gray-600 mb-6">
                Eco Colombo is a leading waste management service dedicated to transforming Colombo into a cleaner, greener, and
                more sustainable city. We are a municipal council initiative born from a deep commitment to environmental stewardship.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to empower the community by promoting environmental awareness and
                fostering a strong sense of collective responsibility in the fight against pollution.
                We believe that through collaborative efforts, we can achieve significant positive change and
                contribute to the well-being of our planet.
              </p>
            </div>


            <div className="flex-1 grid grid-cols-2 gap-8">

              <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={image1}
                  alt="Image 1"
                  className="w-full h-full object-cover"
                />
              </div>


              <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={image2}
                  alt="Image 2"
                  className="w-full h-full object-cover"
                />
              </div>


              <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={image3}
                  alt="Image 3"
                  className="w-full h-full object-cover"
                />
              </div>


              <div className="w-full h-64 bg-gray-300 rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={image4}
                  alt="Image 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-white py-16">
        <div className="max-w-screen-md mx-auto px-6">
          <h1 className="text-3xl font-semibold text-green-700 text-center tracking-widest uppercase mb-6">
            Frequently Asked Questions
          </h1>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div className="bg-white rounded-lg shadow-md p-4" key={index}>
                <button
                  className="w-full text-left text-lg font-semibold text-gray-800 hover:text-green-600 focus:outline-none flex justify-between items-center"
                  onClick={() => toggleAnswer(index)}
                >
                  <span>{faq.question}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-5 h-5 transform transition-transform ${open === index ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`mt-2 text-base text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${open === index ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">

                <span>ECOColombo@gmail.com</span>
              </div>
              <div className="flex items-center">

                <span>(011-) 123-4567</span>
              </div>
              <div className="flex items-center">

                <span>123 Main St, Colombo 01, Sri Lanka</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Facebook</a>
              <a href="#" className="hover:text-gray-300">Twitter</a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 pt-4 border-t border-gray-700">
          <p>&copy; 2024 ECO Colombo. All Rights Reserved.</p>
        </div>
      </footer>


    </div>

  );
};

export default UserDashboard;
