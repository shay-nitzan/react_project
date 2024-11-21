import React, { useEffect, useState } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { robotService } from "../services/robot.service";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";

export function MapView() {
    const [robots, setRobots] = useState([]);
    const defaultFilter = robotService.getDefaultFilter();
    const [filterBy, setFilterBy] = useState(defaultFilter);

    useEffect(() => {
        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

        async function loadRobots() {
            try {
                const robotsData = await robotService.query(filterBy);
                console.log(robotsData); // Check robots data
                setRobots(robotsData);
                placeRobotsOnMap(robotsData, map);
            } catch (err) {
                console.log(err);
                alert("Couldn't load robots");
            }
        }

        loadRobots();

        function placeRobotsOnMap(robotsData, map) {
            const vectorSource = new VectorSource();

            robotsData.forEach((robot) => {
                const randomLongitude = Math.random() * 360 - 180;
                const randomLatitude = Math.random() * 180 - 90;
                const transformedCoordinates = fromLonLat([randomLongitude, randomLatitude]);

                const robotFeature = new Feature({
                    geometry: new Point(transformedCoordinates),
                    robotId: robot.id,
                });

                // Use the robot's image from RoboHash as the icon
                const robotIconStyle = new Style({
                    image: new Icon({
                        src: `https://robohash.org/${robot.id}`, // Fetch the image based on robot ID
                        scale: 0.1, // Adjust the scale to make the icons smaller or larger
                        anchor: [0.5, 1], // Adjust anchor to position the image correctly
                    }),
                });

                robotFeature.setStyle(robotIconStyle);
                vectorSource.addFeature(robotFeature);
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource,
            });
            map.addLayer(vectorLayer);

            // Fit map view to the extent of the robot markers
            const extent = vectorSource.getExtent();
            map.getView().fit(extent, { padding: [20, 20, 20, 20], duration: 1000 });
        }

        return () => {
            map.setTarget(null);
        };
    }, [filterBy]);

    return <div id="map" style={{ width: "100%", height: "400px" }} />;
}






// import React, { useEffect, useState } from "react";
// import Map from "ol/Map.js";
// import View from "ol/View.js";
// import TileLayer from "ol/layer/Tile.js";
// import OSM from "ol/source/OSM";
// import "ol/ol.css";
// import { robotService } from "../services/robot.service";

// export function MapView() {
//     const [ robots, setRobots ] = useState(null)
//     const defaultFilter = robotService.getDefaultFilter()
//     const [filterBy, setFilterBy] = useState(defaultFilter)

//     useEffect(() => {
//         const map = new Map({
//         target: "map",
//         layers: [
//             new TileLayer({
//             source: new OSM(),
//             }),
//         ],
//         view: new View({
//             center: [0, 0],
//             zoom: 2,
//         }),
//         });




//     // useEffect(() => {
//     //     loadRobots()
//     // }, [filterBy])
    
//     async function loadRobots(){
//         try{
//             const robots = await robotService.query(filterBy)
//             setRobots(robots)
//         }
//         catch (err){

//             console.log(err)
//             alert('Couldnt load robots')
//         }
//     }
//     loadRobots()
//     console.log(filterBy)



//     return () => {
//       map.setTarget(null);
//     };
//   }, []);

//   return <div id="map" style={{ width: "100%", height: "400px" }} />;
// }
