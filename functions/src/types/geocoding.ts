export type Hunt = {
  nodes: { [index: number]: Node }
};

export type Node = {
  longitude: number,
  latitude: number,
  address: string,
};

export type GeoEncodeApiResponse = {
  results: Array<GeoEncodeApiResult>,
  status: string,
};

export type GeoEncodeApiResult = {
  formatted_address: string,
  geometry: GeoEncodeGeometry,
  place_id: string,
};

export type GeoEncodeGeometry = {
  location: GeoLocation,
}

export type GeoLocation = {
  lng: number,
  lat: number,
};
