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
