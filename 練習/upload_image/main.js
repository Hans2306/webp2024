var imglist_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1';
var img_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ca370d51a054836007519a00ff4ce59e&photo_id={photo_id}&format=json&nojsoncallback=1';

function getimg() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', imglist_Url, true);
  xhr.send();
  xhr.onload = function() {
    var data = JSON.parse(this.responseText);
    var photoIds = extractPhotoIds(data.photos.photo);
    getImagesByIds(photoIds);
  }
}

function extractPhotoIds(photos) {
  return photos.map(function(item) {
    return item.id;
  });
}

function getImagesByIds(photoIds) {
  var gal = document.getElementById("gallery");
  gal.innerHTML = ''; // Clear existing images
  photoIds.forEach(function(photoId) {
    var xhr = new XMLHttpRequest();
    var url = img_Url.replace('{photo_id}', photoId);
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onload = function() {
      var data = JSON.parse(this.responseText);
      var imgUrl = data.sizes.size[data.sizes.size.length - 1].source; // Get the largest available size
      var img = document.createElement("img");
      img.setAttribute("src", imgUrl);
      gal.appendChild(img);
    }
  });
}
