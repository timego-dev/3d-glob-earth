import React from 'react'
import PropTypes from 'prop-types'
import { Button, Heading, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { CITIES, CITIES_LABELS } from '../const'
import { locationAlias, REGION_LABELS } from '../../../constants/const'
import { cityButtonStyle } from '../styles'
import RadioIcon from '../../Circle'
import { ArrowBackIcon } from '@chakra-ui/icons'

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
            textDecoration='none !important'
            leftIcon={<ArrowBackIcon />}
            mb='78.5px'
            color='white'
            variant='link'
            onClick={() => props.onLocationChange(locationAlias.reg, '')}
          >
            Back to overview
          </Button>

          <Text
            p='4px 12px 1px 12px'
            color='rgba(0, 254, 205, 1)'
            borderRadius='32px'
            bg='transparent'
            fontSize='15px'
            fontFamily='Futura Round Medium'
            border='1px solid rgba(0, 254, 205, 1)'
            lineHeight='19px'
          >
            Coming in fall 2023
          </Text>
          <Heading
            mt='24px'
            lineHeight='44px'
            fontSize='45px'
            fontFamily='Futura Round Bold'
            textTransform='uppercase'
          >
            {REGION_LABELS[props.location?.[locationAlias.reg]]?.label}
          </Heading>

          <Text mt='8px' fontSize='19px' lineHeight='23px'>
            {REGION_LABELS[props.location?.[locationAlias.reg]]?.desc}
          </Text>

          <VStack align='flex-start' mt='60px'>
            <Text lineHeight='23px'>Our Cities:</Text>

            <Wrap spacing='12px' w='300px' mt='16px'>
              {CITIES.map((c) => (
                <WrapItem key={c}>
                  <Button
                    {...cityButtonStyle}
                    onClick={() => props.onLocationChange(locationAlias.ct, c)}
                  >
                    <RadioIcon />
                    {CITIES_LABELS[c]}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
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
