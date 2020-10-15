import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';
import api from "../services/api";
import { useHistory } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/create-orphanage.css';




export default function CreateOrphanage() {

  const history = useHistory()

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [positionUser, setPositionUser] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let cordinates = position.coords;

      setPositionUser({
        latitude: cordinates.latitude,
        longitude: cordinates.longitude
      })
    })
  }, []);

  function handleMapClick(event: LeafletMouseEvent) {
    let { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = new FormData();

    const { latitude, longitude } = position;

    

    data.append('name',name);
    data.append('instrunctions',instructions);
    data.append('latitude',String(latitude));
    data.append('longitude',String(longitude));
    data.append('opening_hours', opening_hours);
    data.append('about', about);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    history.push('/app')

  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });


    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[positionUser.latitude, positionUser.longitude]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={
                    [position.latitude, position.longitude]
                  }
                />
              )
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={
                  (e) => setName(e.target.value)
                }
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={
                  (event) => setAbout(event.target.value)
                }
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map((image) => {
                    return(
                      <img key={image} src={image} alt={name} />
                    );
                  })
                }

                <label htmlFor="images[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="images[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;