
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';


import Circle from 'ol/geom/Circle';
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
import * as olProj from 'ol/proj';

import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';
import {defaults as defaultControls} from 'ol/control';


const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',

  //className: 'custom-mouse-position',
  //target: document.getElementById('mouse-position'),
});		
		
		
const source = new VectorSource({
	
	 format: new GeoJSON(),
        url: 'new_jersey.json',
	
});


const client = new XMLHttpRequest();
client.open('GET', 'traincoords.csv');
client.onload = function () {
  const csv = client.responseText;
  const features = [];

  let prevIndex = csv.indexOf('\n') + 1; // scan past the header line

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
        mass: parseFloat(line[1]) || 0,
        year: parseInt(line[2]) || 0,
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
	controls: defaultControls().extend([mousePositionControl]),
	target: 'map-container',

	
	
  layers: [
    new VectorLayer({
      source: source,
	  
    }),

  ],


  view: new View({
 center: [-8350000, 4890000],
          zoom: 7.5,
         // minZoom: 8.5,
         // maxZoom: 13
  }),
});
const style = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
});
const selectStyle = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 2,
  }),
});

const status = document.getElementById('status');
//const status2 = document.getElementById('status2');
//document.body.appendChild('test');

let selected = null;
let previous = "None";
let oldInner = "None";
map.on('pointermove', function (e) {
  if (selected !== null) {
    selected.setStyle(undefined);
    selected = null;
  }

  map.forEachFeatureAtPixel(e.pixel, function (f) {
    selected = f;
    selectStyle.getFill().setColor(f.get('COLOR') || '#eeeeee');
    f.setStyle(selectStyle);
    return true;
  });


  // if there is a way to select array by just using the selected.get name we could do this in one if statement.
  if (selected) {
    
  //  $countyname = selected.get('NAME');
  //  previous = "Union";
    
    status.innerHTML = selected.get('NAME') +": "+arrayMap.get(selected.get('NAME'));
    if(oldInner != status.innerHTML){
      //console.log("oldInner != status.innerHTML");
        removeElements();
    }
    //console.log("OLD: "+oldInner);
    oldInner = selected.get('NAME') +": "+arrayMap.get(selected.get('NAME'));
    //console.log("NEW: "+selected.get('NAME') +": "+arrayMap.get(selected.get('NAME')));
   

  //  status.innerHTML = previous;
    if(selected.get('NAME') == 'Middlesex'){
      
    if(document.getElementById("myImg") == null){
      var a = document.createElement("img");
      a.src = yardImg.get(Middlesex[0]);
      a.width = 230;
      a.height = 230;
      a.id = "myImg";
      document.body.appendChild(a);
    }
    }
    else if(selected.get('NAME') == 'Hudson'){

      if(document.getElementById("myImg") == null){

        var a = document.createElement("img");
        a.src = yardImg.get(Hudson[0]);
        a.width = 230;
        a.height = 230;
        a.id = "myImg";
     //   a.textContent = "test";
        document.body.appendChild(a);
      }
      if(document.getElementById("myImg2") == null){
        a.src = yardImg.get(Hudson[1]);
        a.width = 230;
        a.height = 230;
        a.id = "myImg2";
        document.body.appendChild(a);
      }
      if(document.getElementById("myImg3") == null){
        a.src = yardImg.get(Hudson[2]);
        a.width = 230;
        a.height = 230;
        a.id = "myImg3";
        document.body.appendChild(a);
        }
        }
        else if(selected.get('NAME') == 'Union'){

          if(document.getElementById("myImg") == null){
    
            var a = document.createElement("img");
            a.src = yardImg.get(Union[0]);
            a.width = 200;
            a.height = 200;
            a.id = "myImg";
         //   a.textContent = "test";
            document.body.appendChild(a);
          }

            }
      else if(selected.get('NAME') == 'Bergen'){

        if(document.getElementById("myImg") == null){
          var a = document.createElement("img");
          a.src = yardImg.get(Bergen[0]);
          a.width = 230;
          a.height = 230;
          a.id = "myImg";
          document.body.appendChild(a);
        }
        if(document.getElementById("myImg2") == null){
          a.src = yardImg.get(Bergen[1]);
          a.width = 230;
          a.height = 230;
          a.id = "myImg2";
          document.body.appendChild(a);
          }
        }
      else if(selected.get('NAME') == 'Passaic'){

        if(document.getElementById("myImg") == null){
          var a = document.createElement("img");
          a.src = yardImg.get(Passaic[0]);
          a.width = 230;
          a.height = 230;
          a.id = "myImg";
          document.body.appendChild(a);
        }
        }
      else if(selected.get('NAME') == 'Essex'){

      if(document.getElementById("myImg") == null){
        var a = document.createElement("img");
        a.src = yardImg.get(Essex[0]);
        a.width = 230;
        a.height = 230;
        a.id = "myImg";
        document.body.appendChild(a);
      }
      }
      else if(selected.get('NAME') == 'Camden'){

        if(document.getElementById("myImg") == null){
          var a = document.createElement("img");
          a.src = yardImg.get(Camden[0]);
          a.width = 230;
          a.height = 230;
          a.id = "myImg";
          document.body.appendChild(a);
        }
        }
      else if(selected.get('NAME') == 'Morris'){

        if(document.getElementById("myImg") == null){
          var a = document.createElement("img");
          a.src = yardImg.get(Morris[0]);
          a.width = 230;
          a.height = 230;
          a.id = "myImg";
          document.body.appendChild(a);
        }
        }
      else if(selected.get('NAME') == 'Somerset'){

        if(document.getElementById("myImg") == null){
          var a = document.createElement("img");
          a.src = yardImg.get(Somerset[0]);
          a.width = 230;
          a.height = 230;
          a.id = "myImg";
          document.body.appendChild(a);
        }
        }
    else if(false){


    }else {

      removeElements();
      status.innerHTML = selected.get('NAME');
      //status.innerHTML = '&nbsp;';
    
    }
/*
    if(document.getElementById("myImg") == null){
    var a = document.createElement("img");
    a.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e4/County_Yard_on_Northeast_Corridor_New_Jersey.jpg';
//    a.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/RTL_Turboliner_at_Adams_Yard_on_Northeast_Corridor_in_August_2021.jpg/1920px-RTL_Turboliner_at_Adams_Yard_on_Northeast_Corridor_in_August_2021.jpg';
    a.width = 200;
    a.height = 200;
    a.id = "myImg";

    document.body.appendChild(a);
    }
    */
 //   status2.innerHTML = selected.get('NAME');
  }   else { removeElements(); }


});

function removeElements(){

  document.getElementById
      const element = document.getElementById('myImg');
      if(element !== null){
      element.remove();
      }
     
      const element2 = document.getElementById('myImg2');
      if(element2 !== null){
      element2.remove();
      }

      const element3 = document.getElementById('myImg3');
      if(element3 !== null){
      element3.remove();
      }

}

const arrayMap = new Map();
arrayMap.set('Middlesex', 'County Yard, Port Reading Junction')
arrayMap.set('Hudson', 'Croxton Yard, Greenville Yard, North Bergen Yard')
arrayMap.set('Union', 'Linden Yard')
arrayMap.set('Bergen', 'Little Ferry Yard, Passaic Junction')
arrayMap.set('Passaic', 'North Hawthorne Station')
arrayMap.set('Essex', 'Oak Island Yard')
arrayMap.set('Camden', 'Pavonia Yard')
arrayMap.set('Morris', 'Port Morris Junction')

const Middlesex = ['County Yard'];
const Hudson = ['Croxton Yard', 'Greenville Yard', 'North Bergen Yard'];
const Union = ['Linden Yard'];
const Bergen = ['Little Ferry Yard', 'Passaic Junction'];
const Passaic = ['North Hawthorne Station'];
const Essex = ['Oak Island Yard'];
const Camden = ['Pavonia Yard'];
const Morris = ['Port Morris Junction'];
const Somerset = ['Port Reading Junction'];

// have map for each county image.
// maybe make map for articles on the wiki for these yards?
const yardImg = new Map();
//https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/RTL_Turboliner_at_Adams_Yard_on_Northeast_Corridor_in_August_2021.jpg/1920px-RTL_Turboliner_at_Adams_Yard_on_Northeast_Corridor_in_August_2021.jpg
yardImg.set('County Yard', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/RTL_Turboliner_at_Adams_Yard_on_Northeast_Corridor_in_August_2021.jpg/1920px-RTL_Turboliner_at_Adams_Yard_on_Northeast_Corridor_in_August_2021.jpg');
yardImg.set('Port Reading Junction', 'http://photos.wikimapia.org/p/00/06/12/15/07_1280.jpg');
yardImg.set('Croxton Yard', 'https://conrailphotos.thecrhs.org/sites/default/files/archive_photo/images/24721.jpg');
yardImg.set('Greenville Yard', 'https://1.bp.blogspot.com/-xD9oi8mTMhs/YU-Hmd7fptI/AAAAAAACSXA/hGbV0sncmn0YxXqagyxA27m4z21_2O9zwCLcBGAsYHQ/s2048/242730141_4497115750326981_8199175489654039820_n.jpg');
yardImg.set('North Bergen Yard', 'https://i.ytimg.com/vi/3RfpuYGTxnk/maxresdefault.jpg');
yardImg.set('Linden Yard', 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Linden_Yard.jpg');
yardImg.set('Little Ferry Yard', 'https://live.staticflickr.com/2491/4122417138_8e56b94b77_3k.jpg');
yardImg.set('Passaic Junction', 'https://saddlebrooknj.us/wp-content/uploads/2015/08/NYSW-Passaic-Junction-4-59-236-a-1024x672.jpg');
yardImg.set('North Hawthorne Station', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/HawthorneNYS%26W.jpg');
yardImg.set('Oak Island Yard', 'https://upload.wikimedia.org/wikipedia/commons/1/10/OakIslandYard.jpg');
yardImg.set('Pavonia Yard', 'https://conrailphotos.thecrhs.org/sites/default/files/archive_photo/images/8395.jpg');
yardImg.set('Port Morris Junction', 'https://live.staticflickr.com/1947/44799499274_38fd8c8d85_5k.jpg');

preloadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/RTL_Turboliner_at_Adams_Yard_on_Northeast_Corridor_in_August_2021.jpg/1920px-RTL_Turboliner_at_Adams_Yard_on_Northeast_Corridor_in_August_2021.jpg');
preloadImage('http://photos.wikimapia.org/p/00/06/12/15/07_1280.jpg');
preloadImage('https://conrailphotos.thecrhs.org/sites/default/files/archive_photo/images/24721.jpg');
preloadImage('https://1.bp.blogspot.com/-xD9oi8mTMhs/YU-Hmd7fptI/AAAAAAACSXA/hGbV0sncmn0YxXqagyxA27m4z21_2O9zwCLcBGAsYHQ/s2048/242730141_4497115750326981_8199175489654039820_n.jpg');
preloadImage('https://i.ytimg.com/vi/3RfpuYGTxnk/maxresdefault.jpg');
preloadImage('https://upload.wikimedia.org/wikipedia/commons/f/f2/Linden_Yard.jpg');
preloadImage('https://saddlebrooknj.us/wp-content/uploads/2015/08/NYSW-Passaic-Junction-4-59-236-a-1024x672.jpg');
preloadImage('https://upload.wikimedia.org/wikipedia/commons/2/2f/HawthorneNYS%26W.jpg');
preloadImage('https://upload.wikimedia.org/wikipedia/commons/1/10/OakIslandYard.jpg');
preloadImage('https://conrailphotos.thecrhs.org/sites/default/files/archive_photo/images/8395.jpg');
preloadImage('https://live.staticflickr.com/1947/44799499274_38fd8c8d85_5k.jpg');
function preloadImage (url) {
  try {
      var _img = new Image();
      _img.src = url;
  } catch (e) { }
}
