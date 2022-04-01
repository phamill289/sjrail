
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';

import Modify from 'ol/interaction/Modify';
import Draw from 'ol/interaction/Draw';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';

import TileJSON from 'ol/source/TileJSON';
import {Map, View} from 'ol';
import {Stamen, Vector as VectorSource} from 'ol/source';
import {Icon, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';



const source = new VectorSource({
	
	 format: new GeoJSON(),
        url: 'new_jersey.json',
	
});

const client = new XMLHttpRequest();
client.open('GET', 'traincoords.csv');

// parse csv, from meteorite
client.onload = function () {
  const csv = client.responseText;
  const features = [];

  let prevIndex = csv.indexOf('\n') + 1; 
  let curIndex;
  while ((curIndex = csv.indexOf('\n', prevIndex)) != -1) {
    const line = csv.substr(prevIndex, curIndex - prevIndex).split(',');
    prevIndex = curIndex + 1;

    const coords = fromLonLat([parseFloat(line[4]), parseFloat(line[3])]);
    if (isNaN(coords[0]) || isNaN(coords[1])) {
      // guard against bad data
      continue;
    }

    features.push(
      new Feature({
        geometry: new Point(coords),
      })
    );
  }
  source.addFeatures(features);
};
client.send();

const points = new VectorLayer({
  source: source,
});
 const map = new Map({
  target: 'map-container',
  
	
	
  layers: [
    new VectorLayer({
      source: source,
	  
    }),

  ],


  view: new View({
 center: [-8350000, 4890000],
          zoom: 8.5,
         // minZoom: 8.5,
         // maxZoom: 13
  }),
});
