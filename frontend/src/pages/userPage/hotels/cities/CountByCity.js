import "./CountByCity.css";
import HotelService from "../../../../services/HotelService";
import HotelType from "../types/HotelType";
import PopularHotel from "../popular/PopularHotel";
import Loader from "../../../../components/loader/Loader";
const CountByCity = () => {
  const URL = "http://localhost:5000/api/hotels/countbycity";
  const { data, loading, error } = HotelService(URL);
  return (
    <div className="MainFeature">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Cities</h1>
          <div className="featured">
            {data.map((city) => (
              <div className="featuredItem" key={city.city}>
                <img
                  src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>{city.city}</h1>
                  <h3>{city.count} properties</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="otherContainer">
            <h1>Type</h1>
            <HotelType />
            <h1>Popular Hotels</h1>
            <PopularHotel />
          </div>
        </>
      )}
    </div>
  );
};

export default CountByCity;
