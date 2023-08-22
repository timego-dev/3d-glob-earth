export const panelStyle = {
  color: 'white',
  position: 'absolute',
  bottom: '64px',
  left: '64px',
  padding: '50px',
  borderRadius: '16px',
  height: '854px',
  width: '517px',
  justifyContent: 'space-between',
  align: 'flex-start',

  border: '1px solid transparent',

  backgroundImage:
    'linear-gradient(to bottom right, #382358, transparent), ' +
    'linear-gradient(to bottom right, transparent, #0000000f), ' +
    'linear-gradient(to bottom right, rgb(209 166 255 / 63%), rgba(216, 180, 253, 0))',

  backgroundClip: 'padding-box, padding-box, border-box',

  css: {
    backgroundOrigin: 'padding-box, padding-box, border-box',
  },
}

export const regionButtonStyle = {
  borderRadius: '75px',
  h: '60px',
  fontFamily: 'Futura Round Bold',
  fontSize: '18px',
  border: '1px solid transparent',
  background:
    'linear-gradient(to bottom right, #1a1122ad, transparent) padding-box, ' +
    'linear-gradient(to bottom right, transparent, #332946d6) padding-box, ' +
    'linear-gradient(to right, rgba(216, 180, 253, 0.7), rgba(216, 180, 253, 0.2)) border-box',
  color: '#FAF6FE',
  w: '100%',
  _hover: {
    bg: 'linear-gradient(#997FB9, #977EB6, #9F7FC3)',
  },
}
