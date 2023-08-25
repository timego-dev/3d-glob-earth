import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Button, Heading, Text, VStack } from '@chakra-ui/react'
import { REGION_LABELS } from '../const'
import { locationAlias } from '../../../constants/const'

City.propTypes = {
  onLocationChange: PropTypes.func,
  location: PropTypes.object,
}

function City(props) {
  return (
    <>
      <VStack align='flex-start' justify='space-between' h='100%'>
        <VStack align='flex-start'>
          <Button
            color='white'
            variant='link'
            onClick={() => props.onLocationChange(locationAlias.reg, '')}
          >
            Back to overview
          </Button>

          <Badge>Coming in fall 2023</Badge>
          <Heading>
            {REGION_LABELS[props.location?.[locationAlias.reg]]?.label}
          </Heading>

          <Text>
            {REGION_LABELS[props.location?.[locationAlias.reg]]?.desc}
          </Text>

          <VStack mt='60px'>
            <Text>Our Cities:</Text>
          </VStack>
        </VStack>

        <Button
          color='white'
          variant='link'
          onClick={() => props.onLocationChange(locationAlias.reg, '')}
        >
          Book IP transit now
        </Button>
      </VStack>
    </>
  )
}

export default City
