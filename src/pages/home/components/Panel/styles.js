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
  bg: 'rgb(255 255 255 / 10%)',
  border: '1px solid rgb(216 180 253 / 64%)',
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

export const locationSelectStyle = {
  control: (provided) => ({
    ...provided,
    w: '284px',
    borderRadius: '8px',
    lineHeight: '16px',

    h: '36px',
    minH: 'auto',
    border: '1px solid rgb(216 180 253 / 50%) !important',
    bg: 'rgb(255 255 255 / 10%)',
    outline: 'none !important',
  }),
  valueContainer: (provided) => ({ ...provided, pl: '9px', pr: '9px' }),
  menuList: (provided) => ({
    ...provided,
    border: '1px solid rgb(216 180 253 / 5%) !important',
    background:
      'linear-gradient(to top, rgb(215 179 255 / 15%), rgba(216, 180, 253, 0.1))',
    pl: '12px',
    pr: '12px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'white',
    fontFamily: 'Futura Round Medium',
    lineHeight: '16px',
    fontSize: '16px',
  }),
  noOptionsMessage: (provided) => ({ ...provided, color: 'white' }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 1)',
  }),
  multiValue: (provided) => ({
    ...provided,
    bg: 'rgba(232, 210, 255, 0.3)',
    color: 'white',
    fontSize: '16px',
    fontFamily: 'Futura Round Medium',
    borderRadius: '2px',
    h: '19px',
  }),
  option: (provided, _state) => ({
    ...provided,
    color: 'white',
    lineHeight: '24px',
    backgroundColor: 'transparent',
    borderRadius: '4px',
    _hover: {
      background: 'rgba(232, 210, 255, 0.3)',
    },
  }),
}
