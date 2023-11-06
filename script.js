var map = L.map('map', {
  center: [51.505, -0.09],
  zoom: 13
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



var di = 0;
let image;
function doImage(err, canvas) {
  if (di === 0) {
    leafletImage(map, function(err, canvas) {
      image = new Image();
      let dimensions = map.getSize();
      image.width = dimensions.x;
      image.height = dimensions.y;
      image.src = canvas.toDataURL();
      
    });

    di = 1;
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

var ci = 0;
let imagePieces = [];
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function cutImageUp() {
  if (ci === 0) {
    for (var x = 0; x < 4; ++x) {
      for (var y = 0; y < 4; ++y) {
        var canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 100;
        var context = canvas.getContext('2d');
        context.drawImage(image, x * 150, y * 100, 150, 100, 0, 0, canvas.width, canvas.height);
        
        // Tworzenie obiektu, który zawiera ID i dane obrazu
        var piece = {
          id: x * 4 + y,
          dataURL: canvas.toDataURL(),
        };

        // Dodanie obiektu do tablicy imagePieces
        imagePieces.push(piece);
      }
    }
    shuffleArray(imagePieces);
    let puzzleOutput = document.getElementById('rasterMap');
    puzzleOutput.innerHTML = "";
    
    for (let i = 0; i < imagePieces.length; i++) {
      let imgChild = document.createElement("img");
      imgChild.classList.add("piece");
      imgChild.setAttribute("id", imagePieces[i].id); // Ustaw ID na podstawie obiektu w imagePieces
      imgChild.draggable = true;
      imgChild.setAttribute("ondragstart", "drag(event)");
      imgChild.src = imagePieces[i].dataURL; // Użyj danych obrazu z obiektu
      puzzleOutput.appendChild(imgChild);
    }
    ci = 1;
  }
}

