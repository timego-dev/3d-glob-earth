export const panelStyle = {
  color: 'white',
  position: 'absolute',
  zIndex: 99,
  top: '64px',
  left: '64px',
  padding: '50px',
  borderRadius: '16px',
  height: '854px',
  width: '517px',
  justifyContent: 'space-between',
  align: 'flex-start',

  border: '1px solid transparent',

  backgroundImage:
    'linear-gradient(to top, #2e29468a, #290c4c61), ' +
    'linear-gradient(to bottom right, #18041e66, #00000026), ' +
    'linear-gradient(to bottom right, rgb(215 179 255 / 62%), rgba(216, 180, 253, 0))',

  // backgroundImage:
  //   'linear-gradient(to top, #2e29468a, #1d073854), ' +
  //   'linear-gradient(to bottom right, #18041e66, #0000000f), ' +
  //   'linear-gradient(to bottom right, rgb(215 179 255 / 52%), rgba(216, 180, 253, 0))',

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
  // border: '1px solid transparent',
  bg: 'rgb(255 255 255 / 10%)',
  border: '1px solid rgb(216 180 253 / 64%)',
  // background:
  //   'linear-gradient(#00000075, #00000075) padding-box, ' +
  //   'linear-gradient(to right, rgb(216 180 253 / 58%), rgb(216 180 253 / 68%)) border-box',
  color: '#FAF6FE',
  w: '100%',
  _hover: {
    bg: 'linear-gradient(#997FB9, #977EB6, #9F7FC3)',
  },
}

export const cityButtonStyle = {
  borderRadius: '40px',
  p: '8px 24px',
  h: '31px',
  bg: 'rgb(255 255 255 / 13%)',
  color: 'rgba(250, 246, 254, 1) !important',
  border: '1px solid rgb(216 180 253 / 64%)',
  fontFamily: 'Futura Round Medium',
  _hover: {
    bg: 'rgb(255 255 255 / 40%)',
  },
}

export const changeLocCaret = {
  bg: 'transparent',
  color: 'rgba(255, 255, 255, 1)',
  fontFamily: 'Futura Round Bold',
  fontSize: '16px',
  lineHeight: '16px',
  border: '2px solid white',
  borderRadius: '40px',
  p: '10px 24px',
  _hover: {
    bg: 'rgb(255 255 255 / 20%)',
  },
}
