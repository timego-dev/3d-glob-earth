import React from 'react'
import PropTypes from 'prop-types'
import { navbarStyle, navButtonStyle } from '../../constants/style'
import { Button, HStack } from '@chakra-ui/react'
import RadioIcon from '../Circle'

FilterBar.propTypes = {
  state: PropTypes.string,
  onChange: PropTypes.func,
}

function FilterBar(props) {
  if (props.show)
    return (
      <HStack {...navbarStyle}>
        <Button
          {...navButtonStyle}
          bg={props.state === 'all' ? 'rgba(81, 36, 117, 1)' : 'transparent'}
          onClick={() => props.onChange('all')}
          w='127px'
          variant='ghost'
        >
          All locations
        </Button>

        <Button
          {...navButtonStyle}
          bg={props.state === 'active' ? 'rgba(81, 36, 117, 1)' : 'transparent'}
          onClick={() => props.onChange('active')}
          w='173px'
          variant='ghost'
        >
          <RadioIcon checked />
          Active locations
        </Button>

        <Button
          {...navButtonStyle}
          bg={
            props.state === 'planned' ? 'rgba(81, 36, 117, 1)' : 'transparent'
          }
          onClick={() => props.onChange('planned')}
          w='185px'
          variant='ghost'
        >
          <RadioIcon />
          Planned locations
        </Button>
      </HStack>
    )

  return null
}

export default FilterBar
