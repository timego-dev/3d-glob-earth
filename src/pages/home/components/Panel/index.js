import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { mobilePanelStyle, panelStyle } from './styles'
import { VStack } from '@chakra-ui/react'
import Overview from './components/Overview'
import { locationAlias } from '../../constants/const'
import City from './components/City'
import Connect from './components/Connect'

Panel.propTypes = {
  onLocationChange: PropTypes.func,
  location: PropTypes.object,
  isMobile: PropTypes.bool,
  visibility: PropTypes.object,
}

function Panel(props) {
  const regionNotSelected = useMemo(
    () => !props.location?.[locationAlias.reg],
    [props.location],
  )

  const cityNotSelected = useMemo(
    () => !props.location?.[locationAlias.ct],
    [props.location],
  )

  const connectNotSelected = useMemo(
    () => props.location?.[locationAlias.con]?.length === 0,
    [props.location],
  )

  const panelMobileStyle = useMemo(
    () => (props.isMobile ? { ...mobilePanelStyle } : {}),
    [props.isMobile],
  )

  return (
    <VStack {...panelStyle} {...panelMobileStyle}>
      {regionNotSelected && (
        <Overview
          isMobile={props.isMobile}
          showSelectRegion={props.visibility?.selectRegion}
          onLocationChange={props.onLocationChange}
        />
      )}

      {!regionNotSelected && cityNotSelected && (
        <City
          location={props.location}
          onLocationChange={props.onLocationChange}
        />
      )}

      {!cityNotSelected && connectNotSelected && (
        <Connect
          location={props.location}
          onLocationChange={props.onLocationChange}
        />
      )}
    </VStack>
  )
}

export default Panel
