import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapIcon from "../utils/mapIcon";
import mapMarker from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import api from '../services/api';


interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    }).catch()
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Marker Happy" />
          <h2>Escolha um orfanato</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Toledo</strong>
          <span>Paraná</span>
        </footer>
      </aside>

      <Map
        center={[-24.7057798, -53.7355468]}
        zoom={14}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {
          orphanages.map((orphanage) => {
            return (
              <Marker
                key={orphanage.id}
                position={[orphanage.latitude, orphanage.longitude]}
                icon={mapIcon}
              >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {orphanage.name}

                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>

            );
          })
        }
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}


export default OrphanagesMap