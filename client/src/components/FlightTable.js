import React, {useState,useEffect} from 'react'

const FlightTable = () => {

        const[data, setData] = useState([]);
        const getData=()=>{
            fetch('DUMMY_DATA.json'
            ,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            }
            )
              .then(function(response){
                console.log(response)
                return response.json();
              })
              .then(function(myJson) {
                console.log(myJson);
                setData(myJson)
              });
          }

          useEffect(()=>{
            getData()
          },[])

    return(
        <div>
            Table
        </div>

    );
}

export default FlightTable