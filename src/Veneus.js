const CLIENT_ID='MAFQKCVA1MGSKQXN1N1E1CHL3AAJGVY2SSOCH0Z5LZQBZA4A';

const CLIENT_SECRET='EUE2CB2Z1JCONJKGYLTNZ3SP3MH5HCPPUFPKVDDI4TTGKLBA';

fetch(`https://api.foursquare.com/v2/venues/explore?cat=Food&near=New+York&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180512`)
  .then(response => response.json())
  .then(result => console.log(result));
