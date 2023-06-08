import { useEffect, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

import './DirectoryPage.css';

function DirectoryPage() {
    const [directories, setDirectories] = useState([]);

    const fetchDirectory = async () => {
        try {
            const response = await fetch('http://localhost:8000/directory');
            const data = await response.json();

            const directorysWithCoordinates = await Promise.all(
                data.map(async (directory) => {
                    const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC9hdyujjlim0WaxKdM5XS4RYjUkQ4PbKw&address=${encodeURIComponent(directory.address)}`);
                    const geocodeData = await geocodeResponse.json();
                    const coordinates = geocodeData.results[0]?.geometry?.location || {};

                    return { ...directory, coordinates };
                })
            );

            return directorysWithCoordinates;
        } catch (error) {
            console.log('Error', error);
        }
    };

    useEffect(() => {
        const loadGoogleMaps = async () => {
            const loader = new Loader({
                apiKey: 'AIzaSyC9hdyujjlim0WaxKdM5XS4RYjUkQ4PbKw',
                version: 'weekly',
                libraries: ['places'],
            });

            await loader.load();

            const data = await fetchDirectory();
            setDirectories(data);
        };

        loadGoogleMaps();
    }, []);

    useEffect(() => {
        const loadMap = () => {
            if (window.google) {
                directories.forEach((directory, index) => {
                    const mapContainer = document.getElementById(`map-container-${index}`);

                    const map = new window.google.maps.Map(mapContainer, {
                        center: directory.coordinates || { lat: 0, lng: 0 },
                        zoom: 16,
                    });

                    const marker = new window.google.maps.Marker({
                        position: directory.coordinates,
                        map: map,
                    });
                });
            }
        };

        loadMap();

        return () => {
            const mapContainers = document.querySelectorAll('[id^="map-container-"]');
            mapContainers.forEach((container) => {
                container.innerHTML = '';
            });
        };
    }, [directories]);

    return (
        <div className="me_directoryPage">
            <div className="directoryPage">
                <div className="directoryPage_container">
                    <h1>Directorio de especialistas:</h1>
                    {directories.map((directory, index) => (
                        <div className="directory_container" key={directory._id}>
                            <p className="directory_title">{directory.title}</p>
                            <p className="directory_description">{directory.description}</p>
                            <p className="directory_services">
                                <span>Servicios que se ofrecen:</span>
                                <br />
                                {directory.services}
                            </p>
                            <p className="directory_payment">
                                <span>Métodos de pago:</span> <br />
                                {directory.payment}
                            </p>
                            <p className="directory_address">
                                <span>Dirección:</span> <br />
                                {directory.address}
                            </p>
                            {directory.phone && (
                                <p className="directory_phone">
                                    <span>Teléfono: &nbsp;</span>
                                    {directory.phone}
                                </p>
                            )

                            }
                            {directory.website && (
                                <a className="directory_website" href={directory.website} target='_blank'>
                                    <span>Website: &nbsp;</span>
                                    {directory.website}
                                </a>
                            )}
                            <div id={`map-container-${index}`} style={{ width: '100%', height: '400px' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DirectoryPage;
