import React from 'react'
import PropTypes from 'prop-types'
import { Button, Heading, Hide, Text, VStack } from '@chakra-ui/react'
import { regionButtonStyle } from '../styles'
import { locationAlias, REGION_LABELS, REGIONS } from '../../../constants/const'

Overview.propTypes = {
  onLocationChange: PropTypes.func,
  isMobile: PropTypes.bool,
  showSelectRegion: PropTypes.bool,
}

function Overview(props) {
  return (
    <>
      <VStack align='flex-start'>
        <Text
          mb={props.isMobile ? '16px' : '32px'}
          letterSpacing={props.isMobile ? '3.2px' : '3.8px'}
          lineHeight='22px'
          textTransform='uppercase'
          color='#00D8AC'
          fontFamily='Futura Round Medium'
          fontSize={props.isMobile ? '16px' : '19px'}
        >
          Network Map
        </Text>

        <Heading
          textTransform='uppercase'
          fontFamily='Futura Round Bold'
          fontWeight={700}
          fontSize={props.isMobile ? '37px' : '45px'}
          lineHeight={props.isMobile ? '36px' : '44px'}
          mb='8px'
        >
          Our global service network
        </Heading>

        <Text
          fontSize={props.isMobile ? '16px' : '19px'}
          lineHeight={props.isMobile ? '20px' : '23px'}
        >
          Each of our locations are interconnected with state-of-the-art 100G
          and 400G wavelengths, tailored to meet the unique demands of the
          region.
          <br /> <br />
          <Hide breakpoint='(max-width: 375px)'>
            <span>
              2023 is going to be a year of growth at Inter.link. We are
              expanding our network into over 35 new locations in three major
              regions across the globe to build a true global backbone:
            </span>
          </Hide>
        </Text>
      </VStack>

      <Hide breakpoint='(max-width: 375px)'>
        <VStack align='flex-start' spacing='16px' w='100%'>
          <Text lineHeight='23px' fontSize='19px'>
            Explore our Regions:
          </Text>

          {REGIONS.map((reg) => (
            <Button
              {...regionButtonStyle}
              key={reg}
              onClick={() =>
                props.onLocationChange({ [locationAlias.reg]: reg })
              }
            >
              {REGION_LABELS[reg]?.label}
            </Button>
          ))}
        </VStack>
      </Hide>
    </>
  )
}

export default Overview
