import React from 'react';
import { Link } from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import {Map, TileLayer} from 'react-leaflet';

import mapMarker from '../images/map-marker.svg';

import 'leaflet/dist/leaflet.css'
import '../styles/pages/orphanages-map.css';


function OrphanagesMap (){
  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Marker Happy"/>
          <h2>Escolha um orfanato</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Toledo</strong>
          <span>Paraná</span>
        </footer>
      </aside>
      
      <Map
        center={[-24.7334961,-53.8063235]}
        zoom={14}
        style={{width: '100%', height: '100%'}}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      </Map>
      
      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF"/>
      </Link>
    </div>
  );
}


export default OrphanagesMap