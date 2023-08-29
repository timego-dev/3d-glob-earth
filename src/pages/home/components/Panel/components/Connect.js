import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button, Heading, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import {
  CITIES_DETAILS,
  DEFAULT_LOCATION,
  locationAlias,
} from '../../../constants/const'
import { cityButtonStyle, locationSelectStyle } from '../styles'
import RadioIcon from '../../Circle'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Select } from 'chakra-react-select'

Connect.propTypes = {
  onLocationChange: PropTypes.func,
  location: PropTypes.object,
}

function Connect(props) {
  const detail = useMemo(
    () => CITIES_DETAILS[props.location?.[locationAlias.ct]] || {},
    [props.location],
  )

  return (
    <>
      <VStack align='flex-start' justify='space-between' h='100%'>
        <VStack align='flex-start'>
          <Button
            textDecoration='none !important'
            fontSize='19px'
            fontFamily='Futura Round Demi'
            leftIcon={<ArrowBackIcon />}
            mb='76px'
            color='white'
            variant='link'
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
            {detail?.label}
          </Heading>

          <Text mt='8px' fontSize='19px' lineHeight='23px' mb='60px'>
            {detail?.desc}
          </Text>

          <VStack align='flex-start' mt='60px'>
            <Text
              lineHeight='23px'
              fontFamily='Futura Round Medium'
              fontSize='19px'
            >
              Direct connections:
            </Text>

            <Wrap spacing='12px' w='100%' mt='16px'>
              {(detail?.connections || []).map((c) => (
                <WrapItem key={c}>
                  <Button
                    {...cityButtonStyle}
                    // onClick={() => props.onLocationChange(locationAlias.ct, c)}
                  >
                    <RadioIcon />
                    {c.label}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>

          <VStack align='flex-start' mt='44px'>
            <Text
              lineHeight='23px'
              fontFamily='Futura Round Medium'
              fontSize='19px'
              mb='16px'
            >
              Connect me to:
            </Text>

            <Select
              components={{
                ClearIndicator: null,
              }}
              isMulti
              useBasicStyles
              name='colors'
              classNamePrefix='chakra-react-select'
              options={[
                { label: 'Option', value: 'option' },
                { label: 'Option', value: 'option' },
                { label: 'Option', value: 'option' },
              ]}
              placeholder='Select a location'
              closeMenuOnSelect={false}
              chakraStyles={locationSelectStyle}
            />
          </VStack>
        </VStack>

        <Button color='white' variant='link'>
          Book IP transit now
        </Button>
      </VStack>
    </>
  )
}

export default Connect
