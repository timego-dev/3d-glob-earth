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

export const REGIONS = ['eu', 'us', 'asia']

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
