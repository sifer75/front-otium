import React, { useEffect, useState, useContext } from "react";
import "./VillaPage.css";
import villaHero from "../assets/villaera.webp";
import Button from "../components/Button";
import VillaCardDetails from "../components/VillaCardDetails";
import Box from "../components/Box";
import DistinctiveFeatures from "../components/DistinctiveFeatures";
import { useParams } from "react-router-dom";
import Grid from "./Grid";
import imagetest from "../assets/Positano.jpeg";
import NeedHelp from "../components/NeedHelp";
import { AuthContext } from "../context/AuthContext";
import service from "../service/service";

function VillaPage() {
  const [villa, setVilla] = useState("");
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const { startDate, endDate, dates } = useContext(AuthContext);

  //fetch Villas Data from db
  const getOneVilla = async () => {
    try {
      const oneVilla = await service.get(`/villa/${id}`);
      //   console.log(oneVilla.data);
      setVilla(oneVilla.data);
    } catch (error) {
      console.log(
        error,
        "there is an error when fetching one villa by ID from db on the villaPage"
      );
    }
  };
  // console.log(villa);

  //fetch Services Data from db
  const getAllServices = async () => {
    try {
      const otiumServices = await service.get("/service");

      setServices(otiumServices.data);
    } catch (error) {
      console.log(
        "there is an error when fetching all the services from db on the villaPage",
        error
      );
    }
  };

  //use UseEffect to give time to the data to load
  useEffect(() => {
    getOneVilla(), getAllServices();
  }, []);

  //if not, display a little message to avoid error message
  if (!villa || !services) {
    return <div>Please wait, content is loading</div>;
  }

  return (
    <>
      <section id="heroSection">
        <div className="heroVillaContainer">
          <img src={villaHero} />
          <Button
            cta={"More Photos"}
            width={3}
            backgroundColor={"grey"}
          ></Button>
        </div>
      </section>
      <section id="villaInfo">
        <div className="textVillaContainer" key={id}>
          <p className="sloganVilla">{villa.Villa.slogan}</p>
          <p className="descriptionVilla">{villa.Villa.description}</p>
          <h2>An Idyllic Villa for</h2>
          <div className="flexBox">
            <Box
              text={"FRIENDS TRIP"}
              status={villa.Villa.idylicStatus[0]}
            ></Box>
            <Box text={"LIFE PARTY"} status={villa.Villa.idylicStatus[1]}></Box>
            <Box
              text={"FAMILY MOMENT"}
              status={villa.Villa.idylicStatus[2]}
            ></Box>
          </div>
          <h2>Is Pet frienldy?</h2>
          <div className="flexBox">
            <Box text={"YES"} petFriendly={villa.Villa.petFriendly}></Box>
            <Box text={"NO"} petFriendly={villa.Villa.petFriendly}></Box>
          </div>
          <h2>Distinctive Features</h2>
          {villa.Villa.distinctiveFeatures.map((feature, index) => {
            return (
              <DistinctiveFeatures
                feature={feature}
                index={index}
              ></DistinctiveFeatures>
            );
          })}
          <h2>Services included</h2>
          {villa.Villa.services.map((element) => {
            return <Grid cellContent={element.title}></Grid>;
          })}
          <h2>Rooms & furnitures</h2>
        </div>
        <section id="galleryPhotos">
          <div className="greenBackgroundServicesVilla">
            <div className="gallery">
              <div className="imageGalleryContainer1">
                <img src={imagetest}></img>
              </div>
              <div className="imageGalleryContainer2">
                <img src={imagetest}></img>
              </div>
              <div className="imageGalleryContainer3">
                <img src={imagetest}></img>
              </div>
              <div className="imageGalleryContainer4">
                <img src={imagetest}></img>
              </div>
              <div className="imageGalleryContainer5">
                <img src={imagetest}></img>
              </div>
            </div>

            <Button
              backgroundColor={"black"}
              cta={"Explore all the photos"}
            ></Button>
          </div>
        </section>
        <NeedHelp></NeedHelp>
        <VillaCardDetails
          name={villa.Villa.name}
          region={`${villa.Villa.region} — ${villa.Villa.country}`}
          numberOfPeople={`${villa.Villa.numberOfPeople} people`}
          squareMeter={`${villa.Villa.squareMeter} m2`}
          beds={`${villa.Villa.bedrooms} bedrooms`}
          bathrooms={`${villa.Villa.bathrooms} bathrooms`}
          view={`${villa.Villa.view} view`}
          pricePerWeek={`${villa.Villa.pricePerWeek}€/week`}
          villa={villa}
        ></VillaCardDetails>
      </section>
      {/* <Outlet
        context={{
          startDate: [startDate, setStartDate],
          endDate: [endDate, setEndDate],
          dates: [dates, setDates],
          villaId: id,
          galleryphotos: villa.Villa.galleryphotos,
          //userId??
        }}
      /> */}
    </>
  );
}

export default VillaPage;
