import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../../Api/api";
import { InsertedBooking, SitterType } from "../../types";
import background from "../../Assets/bg-green.svg";
import './sitters.scss';
import Header from "../Header/Header";
import AuthDetails from '../AuthDetails';
import { useSelector, useDispatch } from 'react-redux';
import { setSitterForBooking } from '../../store/slices/bookingSlice';
import { setSitter } from '../../store/slices/sitterSlice';
import LoadingSpinner from './Loading';

const Sitters: React.FC = () => {
  const dispatch = useDispatch();
  const dateAndTimeslot: InsertedBooking = useSelector((state: any) => state.booking);
  const { dateOfBooking, startTime, endTime, dayNameOfBooking } = dateAndTimeslot;
  const [sitters, setSitters] = useState<SitterType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAvailableSitters = async () => {
      try {
        const response = await api.get('api/sitters/available', {
          params: {
            dateOfBooking: dateOfBooking,
            startTime: startTime,
            endTime: endTime,
            dayNameOfBooking: dayNameOfBooking,
          },
        });
        setSitters(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    // Preload sitters on component mount
    getAvailableSitters();
  }, [dateOfBooking, startTime, endTime, dayNameOfBooking]);

  // Show loading indicator while sitters are being fetched


  return (
    <>
        <AuthDetails />
        <div className="islandaquabg" style={ { backgroundImage: `url(${background})` } }>
          <Header />
        <div className="timeribbon">
       
        <div className="timeribbon__container">
        <Link to="/calendar">
          <div className="timeribbon__container__backbutton-wrapper">
            <div className="timeribbon__container__backbutton-wrapper__backbutton"></div>
          </div>
        </Link>
          
          
           <h1>{dayNameOfBooking} {dateOfBooking}</h1>
           <h2>from { startTime } till { endTime }</h2>
          
          </div>
        </div>
        <div className="maincontainer">
        <div className="availablesitters">

        { isLoading?  (
            <LoadingSpinner />
          ) : (
                      
        


                       
         sitters.map((sitter: SitterType) => (
        <div key={sitter.id}>
        <Link to='/selectedsitter' onClick={() => {
          dispatch(setSitterForBooking({
            sitterId: sitter.id,
            sitterName: sitter.name 
            } as InsertedBooking));
          dispatch(setSitter(sitter));
                }}  
            style={{textDecoration: 'none'}}>
        <div className="availablesitters__card">
        <img className="availablessitters__card__sitterimg" src={sitter.image} width="100" alt="" /><br />
          {sitter.name}
        </div>
        </Link>
        </div>
      ))
    )}
      
    </div>
     </div>
   
    </div>
  </>
  )
}

export default Sitters;
