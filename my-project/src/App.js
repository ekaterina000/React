import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";;


  const users = [
    {
      username: "test1",
      name: "Kapitoshka",
      city: "Samara",
      age: "12",
    },
    {
      username: "test2",
      name: "Katerok",
      city: "Moscow",
      age: "20",

    },
    {
      username: "test3",
      name: "Cvetochek",
      city: "Kazan",
      age: "15",

    },
    {
      username: "test4",
      name: "Guru",
      city: "Samara",
      age: "16",

    },
    {
      username: "test5",
      name: "Bezzabot",
      city: "Moscow",
      age: "18",

    },
    {
      username: "test6",
      name: "Pirozhok",
      city: "Saint-Peterburg",
      age: "18",

    },
    {
      username: "test7",
      name: "008",
      city: "Moscow",
      age: "13",

    },
    {
      username: "test8",
      name: "Avatar",
      city: "Taganrog",
      age: "12",

    },
    {
      username: "test9",
      name: "Knopochka",
      city: "Perm",
      age: "14",

    },
  ];
  

  const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    });
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
  };

const fetchRandomImage = async (username) => {
    try {
      const response = await axios.get(
        `https://source.unsplash.com/250x250/?portrait/${username}`
      );
      return response.request.responseURL;
    } catch (error) {
      console.log("Error fetching profile image:", error);
      return null;
    }
  };
  
  function App() {
    const [userImages, setUserImages] = useState([]);
    const [searchText, setSearchText] = useLocalStorage('searchText', '');
    const [filterCity, setFilterCity] = useLocalStorage('filterCity', '');
    const [filterAge, setFilterAge] = useLocalStorage('filterAge', '');
  
    useEffect(() => {
      const fetchUserImages = async () => {
        const images = await Promise.all(
          users.map(async (user) => {
            const imageUrl = await fetchRandomImage(user.username);
            return { ...user, imageUrl };
          })
        );
        setUserImages(images);
      };
  
      fetchUserImages();
    }, []);
  
    const handleSearchTextChange = (event) => {
      setSearchText(event.target.value);
    };
  
    const handleFilterCityChange = (event) => {
      setFilterCity(event.target.value);
    };
  
    const handleFilterAgeChange = (event) => {
      setFilterAge(event.target.value);
    };
  
    const renderUserProfiles = () => {
      const filteredImages = userImages.filter((user) => {
        const nameMatch = user.name.toLowerCase().includes(searchText.toLowerCase());
        const cityMatch = filterCity === "" || user.city.toLowerCase() === filterCity.toLowerCase();
        const ageMatch = !filterAge || user.age.toString() === filterAge;
  
        return nameMatch && cityMatch && ageMatch;
      });
  
      if (filteredImages.length === 0) {
        return (
          <div style={{ marginTop: "10em", textAlign: "center" }}>
            <h1 style={{ fontSize: "5em", opacity: 0.5, color: "#8A3468" }}>OOOPS, NOTHING FOUND</h1>
          </div>
        );
      }
  
      return (
        <Row className="justify-content-center">
          {filteredImages.map((user) => (
            <Col key={user.username} md={4} className="mb-5">
              <ProfileCard user={user} />
            </Col>
          ))}
        </Row>
      );
    };
  
    return (
      <div className="App" style={{ backgroundColor: '#E2BDD3' }}>
        <Container>
          <Row className="justify-content-center mt-3">
            <Col md={3} className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleSearchTextChange}
              />
            </Col>
            <Col md={3} className="text-center mb-3">
              <Form.Control
                as="select"
                value={filterCity}
                onChange={handleFilterCityChange}
              >
                <option value="">All Cities</option>
                {Array.from(new Set(users.map((user) => user.city))).map((city) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Control
                type="text"
                placeholder="Age"
                value={filterAge}
                onChange={handleFilterAgeChange}
              />
            </Col>
          </Row>
          {renderUserProfiles()}
        </Container>
      </div>
    );
  }
  
      function ProfileCard({ user }) {
        const { name, imageUrl, city, age } = user;
      
        const handleOpenProfileClick = () => {
        };
        return (
          <div className="profile-card text-center">
            
            <div className="profile-info mt-3">
              <div
                className="profile-info-bg"
                style={{
                  backgroundColor: "#F9E1F0",
                  borderRadius: "5px",
                  padding: "10px",
                  width: "250px",
                  margin: "0 auto",
                }}
              >
                <img
                  src={imageUrl}
                  alt={`Photo by ${name}`}
                  style={{
                    borderRadius: "50%",
                    width: "200px",
                    height: "200px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    margin: "0 auto",
                  }}
                />
                <h3 className="profile-name">{name}</h3>
                <p className="profile-city">{city}</p>
                <p className="profile-age">{age} years old</p>
                <Button 
                  onClick={handleOpenProfileClick} 
                  style={{ 
                    backgroundColor: "#8A3468", 
                    border: "none",
                    transition: "background-color 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#A35D8A";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#8A3468";
                  }}
                  onMouseDown={(e) => {
                    e.target.style.backgroundColor = "#6B204C";
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = "#A35D8A";
                  }}
                >
                  Open Profile
                </Button>
              </div>
            </div>
          </div>
        );
        
        
      }
      

export default App;