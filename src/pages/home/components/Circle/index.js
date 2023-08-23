import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { chakra, HStack } from '@chakra-ui/react'

RadioIcon.propTypes = {
  checked: PropTypes.bool,
  mr: PropTypes.string,
}

const commonStyle = {
  w: '16px',
  h: '16px',
  borderRadius: '55%',
  justify: 'center',
}

const radioUncheckStyle = {
  border: '2px dotted rgba(250, 246, 254, 1)',
  sx: {
    div: {
      w: '4px',
      h: '4px',
      borderRadius: '55%',
      bg: 'rgba(250, 246, 254, 1)',
    },
  },
}

const radioCheckStyle = {
  border: '2px solid rgba(217, 217, 217, 0.5)',
  sx: {
    div: {
      w: '8px',
      h: '8px',
      borderRadius: '55%',
      bg: 'rgba(250, 246, 254, 1)',
    },
  },
}

function RadioIcon(props) {
  const checkStyle = useMemo(
    () => (props.checked ? radioCheckStyle : radioUncheckStyle),
    [props.checked],
  )

  return (
    <HStack {...commonStyle} {...checkStyle} mr={props.mr || '8px'}>
      <chakra.div />
    </HStack>
  )
}

export default RadioIcon
