

function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        // Notyfikacje są dozwolone
      }
    });
  } 
}
function findLocation() {
  
    map.locate({ setView: true, maxZoom: 30 });

    map.on('locationfound', function (e) {
      var latlng = e.latlng;
      // latlng.lat= 53.4289//42.3601
      // latlng.lng=14.5530//-71.0589
      console.log(latlng);
      map.setView(latlng,15);
      L.marker(latlng).addTo(map);
    });

   
}
function raster() {

  var img = document.createElement('img');
  var dimensions = map.getSize();
  img.width = dimensions.x;
  img.height = dimensions.y;
  img.src = canvas.toDataURL();
  document.getElementById('Puzzle').innerHTML = '';
  document.getElementById('Puzzle').appendChild(img);
}

var counter = 0;

function checkForWin() {
  counter = 0;
  var divs = document.getElementsByClassName("rectangleInBoard");
  for (let i = 0; i < 16; i++) {
    var elementId = divs[i].getAttribute("data-id");
    if (divs[i].firstChild && divs[i].firstChild.id === elementId) {
      counter++;
    }
  }

  if (counter === 16) {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        var notification = new Notification("Gratulacje!!!");
        alert("Gratulacje!!!");
        console.log("gratulacje");
      } else {
        console.error('Brak zgody na wyświetlanie notyfikacji.');
      }
    }).catch(function (error) {
      console.error('Błąd przy próbie uzyskania zgody na notyfikacje: ' + error);
    });
  }
  
}
 

function allowDrop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var target = ev.target;

  if (!target.hasChildNodes() || target.firstChild.id === data) {
    ev.preventDefault();
  }
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var target = ev.target;

  if (target.classList.contains("piece") && target.id !== data) {
    var pieceBeingDragged = document.getElementById(data);
    var targetPiece = target;

    var parentPieceBeingDragged = pieceBeingDragged.parentNode;
    var parentTargetPiece = targetPiece.parentNode;

    parentPieceBeingDragged.replaceChild(targetPiece, pieceBeingDragged);
    parentTargetPiece.appendChild(pieceBeingDragged);

    checkForWin();
  }
  else {
    ev.target.appendChild(document.getElementById(data));
    checkForWin();
  }
}
