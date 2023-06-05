import React, { useEffect, useState } from "react";
import "./VillaPage.css";
import villaHero from "../assets/villa_era.webp";
import Button from "../components/Button";
import VillaCardDetails from "../components/VillaCardDetails";
import Box from "../components/Box";
import DistinctiveFeatures from "../components/DistinctiveFeatures";
import axios from "axios";
import { useParams } from "react-router-dom";
import Grid from "./Grid";
import imagetest from "../assets/Positano.jpeg";
import NeedHelp from "../components/NeedHelp";
import DatePicker from "react-datepicker";
import { isMatch } from "date-fns";

function VillaPage() {
  const [villa, setVilla] = useState(null);
  const [services, setServices] = useState([]);
  const [matchedServices, setMatchedServices] = useState([]);
  const collectionVilla = "http://localhost:3000/villa";
  const collectionService = "http://localhost:3000/service";
  const { id } = useParams();

  //fetch Villas Data from db
  const getOneVilla = async () => {
    try {
      const oneVilla = await axios.get(`${collectionVilla}/${id}`);
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
      const otiumServices = await axios.get(collectionService);

      setServices(otiumServices.data);
      //   console.log("OTIUM SERV:", otiumServices.data);
    } catch (error) {
      console.log(
        "there is an error when fetching all the services from db on the villaPage",
        error
      );
    }
  };

  // let matchedIDServices = [];
  // let response;

  //check if services.id and villa.Villa.services are a match
  // useEffect(() => {
  //   const checkServices = () => {
  //     if (!villa || services.length === 0) {
  //       return <div>waiting</div>;
  //     }

  //     // console.log(services);

  //     villa.Villa.services.forEach((oneService) => {
  //       // console.log(oneService);
  //       const isMatching = services.ServiceDetail.find(
  //         (element) => element.id === oneService
  //       );
  //       // console.log("it's a match!", isMatching);

  //       if (isMatching) {
  //         // console.log(matchedIDServices);
  //         // return matchedIDServices.push(isMatching);
  //         setMatchedServices(isMatching);
  //       }
  //     });
  //   };
  //   checkServices();
  //   // setMatchedServices(response);
  // }, [services]);

  //use UseEffect to give time to the data to load
  useEffect(() => {
    getOneVilla(), getAllServices();
    // checkServices();
  }, []);

  //if not, display a little message to avoid error message
  if (!villa || !services) {
    return <div>Please wait, content is loading</div>;
  }

  // console.log("mon array de matched services", villa.Villa.services);
  //   //   console.log(villa.Villa);
  //   console.log("services through villa", villa.Villa.services);
  //   console.log("services through services", services);
  //   console.log("services id", services.ServiceDetail[0].id);

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
        <div className="textVillaContainer">
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
            {
              /* console.log(element.title); */
            }
            return <Grid cellContent={element.title}></Grid>;
          })}
          <h2>Rooms & furnitures</h2>
        </div>
        <section id="galleryPhotos">
          <div className="greenBackgroundServices">
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
        ></VillaCardDetails>
      </section>
    </>
  );
}

export default VillaPage;