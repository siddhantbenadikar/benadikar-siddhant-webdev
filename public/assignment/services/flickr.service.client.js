(function() {
    angular
        .module("WebAppMaker")
        .service("FlickrService", flickrService);

    var key = "1cc5f83727651b60426ec34b993059bc";
    var secret = "0c0c171ddc9a511c";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        function searchPhotos(searchTerm){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();