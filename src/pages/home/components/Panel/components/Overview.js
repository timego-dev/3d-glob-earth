import React from 'react'
import PropTypes from 'prop-types'
import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import { REGION_LABELS, REGIONS } from '../const'
import { regionButtonStyle } from '../styles'

Overview.propTypes = {
  onLocationChange: PropTypes.func,
}

function Overview() {
  return (
    <>
      <VStack align='flex-start'>
        <Text
          mb='32px'
          letterSpacing='3.8px'
          lineHeight='22px'
          textTransform='uppercase'
          color='#00D8AC'
          fontFamily='Futura Round Medium'
          fontSize='19px'
        >
          Network Map
        </Text>

        <Heading
          textTransform='uppercase'
          fontFamily='Futura Round Bold'
          fontWeight={700}
          fontSize='45px'
          lineHeight='44px'
          mb='8px'
        >
          Our global service network
        </Heading>

        <Text fontSize='19px' lineHeight='23px'>
          Each of our locations are interconnected with state-of-the-art 100G
          and 400G wavelengths, tailored to meet the unique demands of the
          region.
          <br /> <br />
          2023 is going to be a year of growth at Inter.link. We are expanding
          our network into over 35 new locations in three major regions across
          the globe to build a true global backbone:
        </Text>
      </VStack>
      <VStack align='flex-start' spacing='16px' w='100%'>
        <Text lineHeight='23px' fontSize='19px'>
          Explore our Regions:
        </Text>

        {REGIONS.map((reg) => (
          <Button
            {...regionButtonStyle}
            key={reg}
            // onClick={() => props.onLocationChange(locationAlias.reg, reg)}
          >
            {REGION_LABELS[reg]?.label}
          </Button>
        ))}
      </VStack>
    </>
  )
}

export default Overview
