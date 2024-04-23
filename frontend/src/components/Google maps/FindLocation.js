import React, { useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from 'react-redux';
import {Button, Col, Dropdown, Modal, Row} from 'react-bootstrap'
import Loader from '../Loader'
import {Link} from 'react-router-dom'

const FindLocation = () => {
  const mapContainerRef = useRef(null);
  const { isLoading, product } = useSelector((state) => state.productState);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [transportMode, setTransportMode] = useState('driving'); // Default transport mode
  const [showModal, setShowModal] = useState(false);

  const handleTransportModeChange = (mode) => {
    setTransportMode(mode);
  };



  const fetchData = async () => {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
        });
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, long: longitude });
        setShowModal(false);
        
      } else {
        console.error('Geolocation is not supported by this browser.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error getting user location:', error.message);
    }
  };

  useEffect(() => {
    
  
    fetchData();
   
    
  }, []);

  useEffect(() => {
    let productLocaion;
    if(product.owner)
    {
      productLocaion=[product.owner.location.long, product.owner.location.lat]
    }
    else{
      productLocaion=[product.location.long, product.location.lat]
    }
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2l0ZXN1cHBseWNyYWZ0IiwiYSI6ImNsczczc2tkODFxOTQybG1rcW15MmN5ZGcifQ.GH9KDmNMrtuYd9Mz6gmvgQ';
    const start = [currentLocation?currentLocation.long: 80.54456792289572,currentLocation?currentLocation.lat:5.94943077152277];
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: start,
      zoom: 14,
    });

    const markers = [
      { coordinates: [start[0], start[1]], id: 'marker1' },
      { coordinates:productLocaion , id: 'marker2' },
  ];

    map.on("load", () => {
      // Add FontAwesome icon as a custom marker image
      map.loadImage(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAIACAMAAAC8QUvIAAADAFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///+zjtKaAAAA/nRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaW1xdXl9gYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXp7fH1+f4CBgoOEhYaHiImKi4yNjo+QkZKTlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/plGB9wAAAABYktHRP+lB/LFAAAStElEQVQYGe3BCXxV5Z0G4Pfe7AESAmFJUsDINlMWERABg4i1LlTEMgSoC6LUWEWNgIUW20o7qKkdqKBYtVal4hRECgYBDVRBpagRoQWUJWyJbIFAZMl67/uriEiALHc553zfOef/PLCT6JSuA4fd88iMV5asys//oqCgpOQ4ebykpKDgi/z8VUtemfHIPcMGdk2JhjBW1MUZmZOfyyvwMTAl+fNzsob0iocIV3zvsU+t3ONjSHx7Vj41tnccREjSh/56/pZqhq16y/xfDU2HCEJkr+w5u2mo/bmTM2IhGtbkmql5J2mKyvyZmckQdYsc8Pg6P03l//SxjEiIWrTMnFNCSxzPzWoDUZOnf856Wsm//ol+HojTukzdTgX2zMzwQHSZupXK7J6Z4YGbdZ62lYpt/d/OcKmYzDw/dZCfFQ/3+e+cYmrj6HM94CqxmXnUTH5WY7hF2+ml1FDp9LZwgx5zKqkpX25fOJznmlxq7YNML5wr5qebqb1NY2PgTFFZhbSFwuwYOI83czttY3dWJJzFm7mFtrIzKwLO4RmynrazeXQEHOKqdbSldQPhBG3m+GlXuRfD7hpNLaONVcxMgJ15MnfT5vZmeWFb/T+hA3zcF/bUKMdHR/A/lwAbGrybjrF3GOym1Rw6Sm4abCWzmA5zJMsD20jPowO9kw6byDxCR/oqC3aQ+Coda0EzaK9fAR1sz0DoLXJqNR3NPzMaGkv/kI73SSdo6yfH6QLHRkJPkTl0ieeioKEWK+kaq1Ognd676SJf9odmsiroKlWToZO4V+g6L8dCG83fpwutbQlNdNhCVyr4L2ih/0G6VMlAaCCzjK5VfiuUy/bRxfxToVbUi3S5FyKhUPRCul5uLJSJf5uC7zaGIo3/QfG19xOgRNJaim/kJ0OBVhsovrU5FZZrs4XiOzvSYbE2Oylq2NEGlmq5meIc21JgoabrKM7zr+awTMLHFBf4LAkWiV9FUYs1jWGJ6KUUtcqLhQWiFlPUYXEUzPcsRZ1ehOl+RVGPKTDZSD9FPfy3w1QDyinqVTEIJmp/kKIBhzvDNMlbKRq0oyVMEreGIgBrYmGOv1AE5FWYYhxFgO6FCfpWUASoMgOGa1VEEbB9qTBY5HsUQfgwCsZ6iiIo02GoURRBGg0DdTpOEaRjHWGYyLUUQcuPhlEepwjBNBhkQDVFCHyDYIimuyhCUtgMRniNIkSvwwB3UIRsNMKWXkoRstJ0hOttijD8w4Pw3EkRljsQluRiirAcboVwzKMI02sIw2CKsN2EkCXsoQjbl4kI1WwKA8xCiPr7KAzguxwh8X5EYYh8L0JxJ4VBbkcIGu+lMMi+BATvCQrDTEPQ0ssoDFN2EYL1BoWB5iNIV1EYaiCC4l1HYahPPQjGCAqDDUcQIjZTGGyTF4G7jcJwtyBgEV9QGG5rJAI1lsIEYxCgqB0UJtgVjcDcS2GKLAQktpDCFHtiEIi7KUxyFwLg2URhks+9aNiNFKYZjIa9S2GalWhQLwoT9UFDXqMw0Vw04HuVFCaqaof6zaAw1XTUq3EphalKG6M+YylMdhfqs5bCZP9EPbpRmO4S1G0WhemeQp3iSihMdyQOdbmdwgK3oC6rKSzwLurQ2U9hAX8n1O4xCkv8DrXbSmGJLahVT9qFvyB31oThA7umJDUCGiWldB2YOWHWkgI/7aIHapNDOyia92C/JqhVk/7Z87+kHTyOWnh2UHdly7I7oQGdH1peTt1tRy36UG8VubcnICCJo5dUUm+9caHp1NnWya0QhFbZG6mzP+ACnl3U1wdDPAhWRq6f2trjwfn6U1f+hT0Qkp6L/NRVP5wvh5pa2gsh672cmnoC59tALX3xI4Tlmn9TS5/hPGl+aujEhEiEKWrSSWrIn4pz3UUN5V0MA3RYSQ3diXMtoHbKJnthCE/WCWpnHs4ReYS62dAFhum2kbopiURNA6ib1xrBQHEvUzdXoKbHqZfqh2CwiT7qZRpq+oxaqRgBw/24jFrJRw3N/NTJsWthgkGl1Im/Gc4aQp3s7wlT9DpAnQzGWU9QIzs7wCQdd1Ijj+Gs1dTHwc4wTft91Md7+E7UCWqjtCdM1P0ItXEyGmf0pTYqfghTDSqnNi7HGROpC18mTHZzNXUxAWe8QV08BNNNoi7ewBn7qIm5MJ9nETWxH99KpyY2xMMCzfdQExfhtJuph7JusMTlldTDUJz2G+rhflhkMvXwK5z2OrWQ54FFPO9RC/Nw2hbq4ER7WOb7ldTB5/hGfDV1MAEWepI6qI7DKX2og81RsFD8LuqgF075KXVwPSw1nDoYg1OeogaWwmIrqIEZOOUfVM/fCxYbQA3k4ZRCqrcQlltN9Xbia9HVVK8HLHct1auKBNCB6uVBgY+pXjqAH1K966HAzVRvEICfUrmtHijg2U7l7gLwGJWbBCWmULnfAZhL1SpbQ4nWlVTtrwDWULU3ocgyqvYBgL1U7TYoMoaqFQHRfipWlgBFmlZQMV8UUqnaMiiTR9VaoxtVexDKTKRqXTCIqnWEMt+naldiOBUrgkJ7qdgw/IyK/Q0KLaBid+MRKvYgFBpPxX6B6VSsHxS6gor9H+ZQLV9jKJTop1ov4S2qtQ1K7aJab+J9qvUmlFpKtVbhI6o1E0rNplr/xHqqNQFK/ZxqfYrNVGs4lBpBtTaigGpdCaUGUa1tKKRaXaBUd6q1GweoVgqUSqNa+3GUaiVCqSSqVYKTVCsOSsVTrROoploRUCqCalXDR7UioFQE1apGOdWKg1LxVOskjlGtRCiVRLVKcZhqpUKp71GtQyiiWl2hVHeqVYjNVOsqKPUDqvVvrKFaw6HUCKr1AZZRrQlQahLVegtzqdbTUGo21XoVv6dauVBqGdXKwf1UqwBK7aFa9+FmquVPgEKJfqp1E3pRsf5QKIOK9URLKpYNhSZSsWR4yqjWfCi0kGqVeYDtVOtLKLSPam0F8C4V6wRlulCxlQD+TMWyocxEKvYCgGwqthzKrKBiDwC4moqVJ0KRphVU7CoAyVRtNBS5i6o1x9f2UbElUORtKlaEU96hYlUpUKJ1JRVbhlOmU7XJUOIRqvYkThlD1bZ5oICngKqNxim9qNxgKDCEyl2CU2IrqNpKKLCKqpXF4BtrqFxPWO5yKvc+TnuSyi2C5d6ick/gtKFUrw8sdpmfyt2I01r4qdxyWGwllfM3x7c+p3qDYamRVG8jzniB6m2LhoWaFFG953DGGGpgEiw0nRq4A2d0pAZOdoBlulRSAxfjO/uogZUeWMS7mhrYi7PmUAfZsMgU6uBlnHUrdVB+CSzRt5I6GIWzkn3UwcZGsEByIXVQ3Rw1fEQtLPTAdJ7F1MIa1PRb6mEiTPdL6uE3qKkf9eAbCZON8lEPl6GmiEPUQ+V1MNXV5dRDsRfn+Bs18VUvmKj3MWriVZxrDHVR3Bmmab+furgV52rloy52doRJOu6iLqpb4DyrqI1DfWGK3geojRU434PUx7HrYIKrS6mPe3G+NB/1UTEKhhtWRn34UnCBD6kR3yQPDOX5pY8aWY0LTaBW8lrBQMlvUSsP4EJt/NRKYQYM02cnteJvg1p8RL1UTfXCEJ7sSurlQ9RmEnXzXhcYoNtq6mYCapPup26qZjZBmOKnVlA3/nao1SfUT+FwhGVEEfWzFrV7gDpaMQAh67uSOroPtUuupJZWXYeQ9HmLWipvjjosoqbWj45AkDzX5FJTC1CX/6G29uS0RRBSJm+ntoaiLjGHqK+qZWOaIiBJdy6vor6Ko1CnZ6i1incmfB8N6DIxr4Jam4W6XU7t7Vsw/opE1CoxY/wb+6m93qjHF7SFnUuf+fnIQd3TkpoATZLSug8a9fPZy3bRFjahPo9QmGwy6tOmmsJUVWmo1xIKUy1C/YZQmOoG1M+7i8JEuyPQgF9TmGgKGtK6ksI0Valo0BsUppmPhl1LYZofoGGerRQm2e5FACZRmORhBKJFOYUpypMRkJcpTPEXBKYbhSl6IEDvUZhgJQJ1M4UJhiBQ3u0UhtvmRcAeojDc/Qhck6MUBitNQBD+SGGwPyAYF1VTGKo6HUH5O4Wh5iM4V1IYqj+C9CGFgVYhWEMpDDQYwfL8m8IwGzwI2h0UhrkFwYvaRWGQHZEIQTaFQe5DKOIPUhjiQBxC8iiFIaYgNM2OURjgq6YI0QwKA/weoUorowjbyRSE7BmKsD2F0LUppwhTWRrCMJsiTDMRjjblFGEpT0NY/kQRlqcRnrYVFGEo/x7C9DxFGJ5BuNpWUISsoh3C9gJFyGYjfOmVFCGqaAsD/IkiRE/DCKknKUJyMg2GmE4RkhwYI7mUIgRHm8Mgv6UIwa9hlMRDFEErToBhJlMEbQKME1dEEaQv42GgcRRBugdGiiqgCMrOaBjqDoqg3AZjeddRBGG9Fwa7gSIIP4Th8igCthzGu8RHESBfT5hgLkWAXoYZLiqnCEhZW5hiOkVAcmCOpMMUAShpBpNMpgjAeJgldjdFg3bGwDSjKRp0C8zj/ZiiAWs9MFF/P0W9/Bkw1esU9ZoLc6WXUdTjZDuYLIeiHr+D2ZrspajT/iYw3d0UdRoD83k/pajDOi8sMIiiDlfCEosparUA1uhYQVGL8vawyO8pajENVmnyJcUFChvDMrdRXGAkrONZRXGe9z2w0KXVFOeovgSW+hPFOZ6GtZodoqjhcHNYbBxFDVmwWsR6iu+si4DlMvwU3/JfCQXmUnxrDlRofZTiG6UpUOIhim+MgxoRn1F87dMIKNLHR0FfPyjzIgWfgzrNi+l6h5OhUBZdbyxU8q6hy33shVLdq+hq1ZdCsafpajOhWuJeutjeRCg3ki6WCQ3k0rWWQgftjtOlTqRDC5PpUg9DD5Gf0ZU2REETfXx0IV8/aGM2XWgW9JFQRNfZ2xQaGUnXGQat5NJllkIvFx2nq3zVFpoZT1e5H7rxrqGLrI2AdrpV0jUqukBD0+gaj0JHMZvoEp/HQEv9fHQF3xXQ1LN0hVnQVUIhXWB3E2jrR3SBm6CxeXS8udBZ8gE6XHFLaG0UHW44NLeAjvY36K7FATpYcUto7yd0sEzYwAI61iLYQYuDdKjiVrCFW+lQI2ATb9CRFsEuWh+mAx1qBdu4nQ40CjaykI6zGHaScpgOc6g1bGU0HeYW2Mzf6Shvwm5SSuggR9JgO2PoILfChhbRMXJhR6kldIgjabClO+kQt8OmltIRcmFXqYfoAMUpsK1hdIARsLG5tL1XYGeJu2lzhUmwtR/4aWu+q2Fzs2hrM2B3sRtpY5vjYHs9K2lbVZfBAR6lbU2BE0SupU2tiYAjtD9GWzreCQ4xjrZ0D5zCs5Q29LYHjpF6mLZTnAIHGUbbGQFH+X/azBw4S9M9tJWiJDjMNX7aiO9qOM7TtJEZcJ7YjbSNzXFwoN6VtImKS+FIv6BNTIQzeVfQFt7xwqHSDtEGilPhWD+mDQyFgz1P7T0DJ4v/nJrbFA9H61lBrZX3gMM9TK09BKfz5lFjb3vgeK32U1sHU+ACN/ipKf8QuMKz1NQsuEPsv6ilTXFwia5l1FD5JXCN8dTQA3APzxJqZ5kHLtJyHzVzoDVc5Xo/teK/ES4zi1r5I9wm5lNqJD8GrtOhlNo41gkuNJLauBWu9BI18TzcqdFmamFjPFyq60lqoKw7XOtn1MBYuNhrVG4e3CxxBxXbngBXu6yCSlVeDpd7mEplw+08i6nQWx64XosiKlOYDIErq6lI9SCIr02lIo9AnOJdQSXejYD4RloxFTiQCvGtwX5aznctxHeeoOV+C3FWxApa7N0IiBpa7aWl9qdAnGNQNS3kuwbiPFNpoSkQ5/O+Tcus8EJcoGURLVKYDFGLfpW0RFUGRK1+QUtMhKidZxEtkOuBqEPSDppud3OIOvWpoMkq+0HUI5smGwdRr9dpqnkQ9WvyBU20LQGiAd1P0jRll0I06G6a5i6IALxIkzwPEYjYfJpifRxEQNodoglKLoYI0I98NJzvBoiATaPhpkIEzruMBsuLgAhCs5001O5kiKD0KaeByi+DCNJ9NFAWRNBeomFehQhe3DoaZEM8RAg6HKUhjrSHCMkQPw3g/zFEiHJogGkQoYpcybC9EwERsmY7GKZdyRBh6HGCYSnrBRGW2xiWOyHCNJthmAURrqjVDNmaaIiwtS5iiPalQRigXwVDUjkAwhDjGJJ7IQzyIkPwVwijxH7CoH0WD2GYtgcZpMPpEAa6uopBqb4OwlAPMCj3QxjscQZhGoTRPC8xYH/2QBjO8yQDNNMLYYZsHwPgnwphkpsOskEHboQwTcvFbMDyVAgTeW7ZyXoUjIIwWcz4/azD/uxoCPNFZ+b5eaH8rFgIi7TNWniUNRxZcHcbCEt5LrphQs6zc+c+mzP++nYQIjT/AYgaWMvr3+bSAAAAAElFTkSuQmCC`,
        (error, image) => {
          if (error) throw error;

          map.addImage("custom-marker", image);

          // Add starting point to the map
          map.addLayer({
            id: "point",
            type: "symbol",
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    properties: {},
                    geometry: {
                      type: "Point",
                      coordinates: start,
                    },
                  },
                  ...markers.map(marker => ({
                    type: "Feature",
                    properties: { id: marker.id },
                    geometry: {
                        type: "Point",
                        coordinates: marker.coordinates,
                    },
                })),
                ],
              },
            },
           /*  layout: {
              "icon-image": "custom-marker",
              "icon-size": 0.05,
              "icon-allow-overlap": true,
              
            }, */
            
          });
        }
      );
      getRoute(markers[0].coordinates,markers[1].coordinates);
    });



    // Display popups for each marker
    markers.forEach((marker,i) => {
      let popup;
      if(product.owner)
      {
        popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(i === 1 ? `<div>
        <h4>${product.owner?.shopName}</h4>
        <p>${product.owner?.address.number},${product.owner.address.street},${product.owner.address.city},<br/>
        ${product.owner.address.district},${product.owner.address.province},${product.owner.address.postalCode}</p>
        </div>` : 'My Location');
      }
      else{
        popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(i === 1 ? `<div>
        <h4>${product.firstname+" "+product.lastname}</h4>
        <p>${product.address.number},${product.address.street},${product.address.city},<br/>
        ${product.address.district},${product.address.postalCode}</p>
        </div>` : 'My Location');
      }


        new mapboxgl.Marker()
        .setLngLat(marker.coordinates)
        .setPopup(popup)
        .addTo(map)
        .togglePopup(); // Show the popup immediately
    });

    
  const bounds = new mapboxgl.LngLatBounds();

  // Extend bounds with the coordinates of each marker
  markers.forEach(marker => {
    bounds.extend(marker.coordinates);
  });




  // Set map center and zoom level based on the bounds
  map.fitBounds(bounds, {
    padding: 50, // adjust as needed
    maxZoom: 15, // set the maximum zoom level
  });

    async function getRoute(start, end) {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${transportMode}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;

      // Add or update the route on the map
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 1,
          },
        });
      }
      

      // Convert duration from seconds to hours and minutes
      const durationInHours = Math.floor(data.duration / 3600);
      const remainingMinutes = Math.floor((data.duration % 3600) / 60);
    
      // Convert distance from meters to kilometers and remaining meters
      const distanceInKilometers = Math.floor(data.distance / 1000);
      const remainingMeters = Math.floor(data.distance % 1000);
    
      setDuration(`${durationInHours} hours ${remainingMinutes} minutes`);
      setDistance(`${distanceInKilometers} Km ${remainingMeters} m`);
    }
    return () => map.remove(); // Cleanup map on component unmount
  }, [currentLocation,transportMode]);

  
return (
     <div>
     {isLoading ? (
       <Loader />
     ) : (
       <>
         <div style={{ margin: '20px' }}>
           <Row>
             <Col md={8}>
             <div ref={mapContainerRef} style={{ flex: 1, height: "80vh" }} />
             </Col>
             <Col className="card p-5">    
                <center>
                 <h1 style={{ color: '#053B50' }}>Route</h1>
               </center>               
               <Row>
                 <Col md={{ span: 4, offset: 1 }}>From:-</Col>
                 <Col style={{ color: 'blue' }}>Your Location</Col>
               </Row>
               <Row>
                 <Col md={{ span: 4, offset: 1 }}>To:-</Col>
                 <Col style={{ color: 'blue' }}>{product.owner?product.owner.shopName:product.firstname+" "+product.lastname}</Col>
               </Row>
               <Row>
                 <Col md={{ span: 4, offset: 1 }}>Distance:-</Col>
                 <Col style={{ color: 'blue' }}>{distance}</Col>
               </Row>
               <Row>
                 <Col md={{ span: 4, offset: 1 }}>Mode:-</Col>
                 <Col style={{ color: 'blue' }}>
                   <Dropdown>
                     <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                       {transportMode}
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                       <Dropdown.Item onClick={() => handleTransportModeChange('driving')}>
                         DRIVING
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => handleTransportModeChange('walking')}>
                         WALKING
                       </Dropdown.Item>
                       <Dropdown.Item onClick={() => handleTransportModeChange('cycling')}>
                         CYCLING
                       </Dropdown.Item>
                     </Dropdown.Menu>
                   </Dropdown>
                 </Col>
               </Row>
               <Row>
                 <Col md={{ span: 5, offset: 1 }}>Duration:-</Col>
                 <Col style={{ color: 'blue' }}>{duration}</Col>
               </Row>
             </Col>
           </Row>
         </div>
         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
           <Modal.Header closeButton>
             <Modal.Title>Location Error</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <p>Please enable location services to use this feature.</p>
           </Modal.Body>
           <Modal.Footer>
             <Link to={`/product/${product._id}`}>
               <Button variant="secondary" onClick={() => setShowModal(false)}>
                 Close
               </Button>
             </Link>
           </Modal.Footer>
         </Modal>
       </>
     )}
   </div>
  );
}

export default FindLocation;