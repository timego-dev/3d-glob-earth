import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { panelStyle } from './styles'
import { VStack } from '@chakra-ui/react'
import Overview from './components/Overview'
import { locationAlias } from '../../const'
import City from './components/City'

Panel.propTypes = {
  onLocationChange: PropTypes.func,
  location: PropTypes.object,
}

function Panel(props) {
  const regionNotSelected = useMemo(
    () => !props.location?.[locationAlias.reg],
    [props.location?.[locationAlias.reg]],
  )

  const cityNotSelected = useMemo(
    () => !props.location?.[locationAlias.ct],
    [props.location?.[locationAlias.ct]],
  )

  const connectNotSelected = useMemo(
    () => !props.location?.[locationAlias.con],
    [props.location?.[locationAlias.con]],
  )

  return (
    <VStack {...panelStyle}>
      {regionNotSelected && (
        <Overview onLocationChange={props.onLocationChange} />
      )}

      {!regionNotSelected && cityNotSelected && (
        <City
          location={props.location}
          onLocationChange={props.onLocationChange}
        />
      )}

      {!cityNotSelected && connectNotSelected && (
        <Overview onLocationChange={props.onLocationChange} />
      )}
    </VStack>
  )
}

export default Panel
