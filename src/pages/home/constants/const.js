import locations from 'assets/json/locations.json'

export const locationAlias = {
  reg: 'region',
  ct: 'city',
  con: 'connections',
}

export const DEFAULT_LOCATION = {
  [locationAlias.reg]: '',
  [locationAlias.ct]: '',
  [locationAlias.con]: [],
}

export const copyJson = (data) => {
  return JSON.parse(JSON.stringify(data))
}

export const REGIONS = ['europe', 'usa', 'asia & others']

export const REGION_LABELS = {
  [REGIONS[0]]: {
    label: 'Europe',
    desc: 'The third phase of our expansion will focus on Asia and Oceania and will consist of the following new PoPs',
    cities: [{ label: 'Hong Kong', value: 'hk' }],
  },
  [REGIONS[1]]: {
    label: 'USA',
    desc: 'The third phase of our expansion will focus on Asia and Oceania and will consist of the following new PoPs',
  },
  [REGIONS[2]]: {
    label: 'Asia & Oceania',
    desc: 'The third phase of our expansion will focus on Asia and Oceania and will consist of the following new PoPs',
  },
}

export const REGION_COORDINATES = {
  [REGIONS[0]]: { lat: 53.5775, lng: 23.106111 },
  [REGIONS[1]]: { lat: 47.116386, lng: -101.299591 },
  [REGIONS[2]]: { lat: 1.2916666666667, lng: 103.85 },
}

export const CITIES = ['hk', 'sing', 'syd', 'tok']

export const CITIES_DETAILS = {
  [CITIES[0]]: {
    label: 'Hong Kong',
    desc: 'A short description that explains something about this city in correlation to inter.link',
    connections: [
      { label: 'Tokyo', value: 'tokyo' },
      { label: 'Singapore', value: 'sing' },
      { label: 'Sydney', value: 'syd' },
    ],
  },
  [CITIES[1]]: {
    label: 'Singapore',
    desc: 'A short description that explains something about this city in correlation to inter.link',
    connections: [
      { label: 'Tokyo', value: 'tokyo' },
      { label: 'Singapore', value: 'sing' },
      { label: 'Sydney', value: 'syd' },
    ],
  },
  [CITIES[2]]: {
    label: 'Sydney',
    desc: 'A short description that explains something about this city in correlation to inter.link',
    connections: [
      { label: 'Tokyo', value: 'tokyo' },
      { label: 'Singapore', value: 'singapore' },
      { label: 'Sydney', value: 'sydney' },
    ],
  },
}

export const locationByRegion = locations.reduce(
  (rs, n) => {
    rs[n.region].countries.push(n)
    return rs
  },
  {
    europe: { lat: 53.5775, lng: 23.106111, countries: [] },
    usa: { lat: 47.116386, lng: -101.299591, countries: [] },
    'asia & others': { lat: 1.2916666666667, lng: 103.85, countries: [] },
  },
)

export const flightMap = {
  europe: [
    { from: 'Madrid', to: 'Paris' },
    { from: 'Madrid', to: 'Manchester' },
    { from: 'Madrid', to: 'Amsterdam' },
    { from: 'Madrid', to: 'Berlin' },

    { from: 'Paris', to: 'Amsterdam' },
    { from: 'Paris', to: 'Manchester' },
    { from: 'Paris', to: 'Berlin' },
    { from: 'Paris', to: 'Madrid' },

    { from: 'Berlin', to: 'Paris' },
    { from: 'Berlin', to: 'Manchester' },
    { from: 'Berlin', to: 'Amsterdam' },
    { from: 'Berlin', to: 'Madrid' },

    { from: 'Amsterdam', to: 'Paris' },
    { from: 'Amsterdam', to: 'Manchester' },
    { from: 'Amsterdam', to: 'Berlin' },
    { from: 'Amsterdam', to: 'Madrid' },
  ],
  usa: [
    { from: 'New York', to: 'Washington D.C' },
    { from: 'New York', to: 'California' },

    { from: 'California', to: 'Washington D.C' },
    { from: 'California', to: 'New York' },

    { from: 'Washington D.C', to: 'New York' },
    { from: 'Washington D.C', to: 'California' },
  ],
  'asia & others': [
    { from: 'Hong Kong', to: 'Tokyo' },
    { from: 'Hong Kong', to: 'Singapore' },
    { from: 'Hong Kong', to: 'Sydney' },

    { from: 'Tokyo', to: 'Hong Kong' },
    { from: 'Tokyo', to: 'Singapore' },
    { from: 'Tokyo', to: 'Sydney' },

    { from: 'Singapore', to: 'Hong Kong' },
    { from: 'Singapore', to: 'Tokyo' },
    { from: 'Singapore', to: 'Sydney' },
  ],
}

const locationHashmap = locations.reduce((rs, n) => {
  rs[n.city] = n
  return rs
}, {})

export const calculateFlightData = (region) => {
  let flights = Object.values(flightMap).flat()
  if (!region) {
    return flights.map((fl) => ({
      state:
        locationHashmap[fl.from].state === 'active' &&
        locationHashmap[fl.to].state === 'active'
          ? 'active'
          : 'planned',
      startLat: locationHashmap[fl.from]?.lat,
      startLng: locationHashmap[fl.from]?.lng,
      endLat: locationHashmap[fl.to]?.lat,
      endLng: locationHashmap[fl.to]?.lng,
    }))
  }
}

export const allLocations = [
  {
    label: 'Europe',
    options: locationByRegion.europe.countries.map((cou) => ({
      label: cou.city,
      value: cou.city,
      icon: cou.icon,
    })),
  },
  {
    label: 'USA',
    options: locationByRegion.usa.countries.map((cou) => ({
      label: cou.city,
      value: cou.city,
      icon: cou.icon,
    })),
  },
  {
    label: 'Asia & Others',
    options: locationByRegion['asia & others'].countries.map((cou) => ({
      label: cou.city,
      value: cou.city,
      icon: cou.icon,
    })),
  },
]
