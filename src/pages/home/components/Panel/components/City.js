import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Heading, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import {
  DEFAULT_LOCATION,
  locationAlias,
  locationByRegion,
  REGION_LABELS,
} from '../../../constants/const'
import { cityButtonStyle } from '../styles'
import RadioIcon from '../../Circle'
import { ArrowBackIcon } from '@chakra-ui/icons'

City.propTypes = {
  onLocationChange: PropTypes.func,
  location: PropTypes.object,
}

function City(props) {
  const [isBook, setIsBook] = useState(true)

  const cities = useMemo(
    () => locationByRegion[props.location[locationAlias.reg]]?.countries || [],
    [props.location],
  )

  return (
    <>
      <VStack align='flex-start' justify='space-between' h='100%'>
        <VStack align='flex-start'>
          <Button
            textDecoration='none !important'
            leftIcon={<ArrowBackIcon />}
            mb='76px'
            color='white'
            variant='link'
            fontSize='19px'
            fontFamily='Futura Round Demi'
            onClick={() => props.onLocationChange({ ...DEFAULT_LOCATION })}
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
            <Text
              lineHeight='23px'
              fontFamily='Futura Round Medium'
              fontSize='19px'
            >
              Our Cities:
            </Text>

            <Wrap spacing='12px' w='100%' mt='16px'>
              {cities.map((c) => (
                <WrapItem key={c.lat}>
                  <Button
                    {...cityButtonStyle}
                    onClick={() =>
                      props.onLocationChange({ [locationAlias.ct]: c.city })
                    }
                  >
                    <RadioIcon />
                    {c.city}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        </VStack>

        {isBook ? (
          <Button
            color='white'
            variant='link'
            onClick={() => setIsBook((prev) => !prev)}
          >
            Book IP transit now
          </Button>
        ) : (
          <Button
            borderRadius='40px'
            fontFamily='Futura Round Bold'
            fontSize='16px'
            p='13px 24px 10px 24px'
            bg='#02DDB5 !important'
            color='white'
            onClick={() => setIsBook((prev) => !prev)}
          >
            Book Services
          </Button>
        )}
      </VStack>
    </>
  )
}

export default City
