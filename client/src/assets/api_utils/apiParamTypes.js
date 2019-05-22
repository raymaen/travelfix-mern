// SRC : https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements

// # The api is not compatible with every conrty

export const categories = {
  airport: "airport",
  bay: "bay",
  beach: "beach",
  building: "building",
  city: "city",
  forest: "forest",
  island: "island",
  lake: "lake",
  mountain: "mountain",
  landscape: "landscape",
  underwater: "underwater"
};

/*
Example get request url for category : 
"https://webcamstravel.p.rapidapi.com/webcams/list/category=bay?lang=en&show=webcams%3Aimage%2Clocation"
*/

export const countries = {
  Antartica: "AQ",
  Argentina: "AR",
  Austria: "AT",
  Australia: "AU",
  Brazil: "BR",
  Switzerland: "CH",
  Spain: "ES",
  France: "FR",
  Greece: "GR",
  Croatia: "HR",
  Israel: "IL",
  Iceland: "IS",
  Japan: "JP",
  NewZealand: "NZ"
};

export const countriesJson = JSON.stringify(countries)

export const requestTypes = {
  byCountry: "country",
  byCategory: "category",
  byUniqueId: "webcam"
};

// Check if the input is correct - not to make bad requests to api

export const apiParamsValidator = {

  isValidType: type => {
    let res = false;

    Object.values(requestTypes).forEach(val => {
      if (String(type) === val) {
        res = true;
      }
    });

    return res;
  },
  isValidCategoy: cat => {
    let res = false;

    Object.values(categories).forEach(val => {
      if (String(cat) === val) {
        res = true;
      }
    });

    return res;
  },

  isValidCountry: country => {
    let res = false;

    Object.values(countries).forEach(val => {
      if (String(country) === val) {
        res = true;
      }
    });

    return res;
  }
};
