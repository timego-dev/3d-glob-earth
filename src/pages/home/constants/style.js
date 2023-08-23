export const globStyle = {
  position: 'absolute',
  zIndex: 2,
  right: '-400px',
}

export const blurringBlueStyle = {
  position: 'absolute',
  top: '20vh',
  right: '12vw',

  width: '600px',
  height: '500px',
  zIndex: 1,

  background: 'linear-gradient(#192238, #25354C, #343A5D)',
  filter: 'blur(100px)',
}

export const navbarStyle = {
  h: '39px',
  p: '4px',
  zIndex: 10,
  position: 'absolute',
  bottom: '64px',
  right: '64px',
  borderRadius: '48px',
  bgGradient:
    'linear(to right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
}

export const navButtonStyle = {
  _hover: { bg: 'rgba(81, 36, 117, 1)' },
  h: '31px',
  color: 'white',
  borderRadius: '40px',
}
