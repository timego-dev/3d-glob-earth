import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  chakra,
  Heading,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import {
  allLocations,
  DEFAULT_LOCATION,
  locationAlias,
  locationByRegion,
} from '../../../constants/const'
import { cityButtonStyle, locationSelectStyle } from '../styles'
import RadioIcon from '../../Circle'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { chakraComponents, Select } from 'chakra-react-select'

Connect.propTypes = {
  onLocationChange: PropTypes.func,
  location: PropTypes.object,
}

function Connect(props) {
  const [isBook, setIsBook] = useState(true)

  const detail = useMemo(() => {
    let cities =
      locationByRegion[props.location[locationAlias.reg]]?.countries || []

    let directCities = cities.filter(
      (cou) => cou.city !== props.location[locationAlias.ct],
    )

    return {
      directCities,
      current: cities.find((c) => c.city === props.location[locationAlias.ct]),
    }
  }, [props.location])

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

          <HStack spacing='4px'>
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

            <Text
              p='4px 12px'
              color='#FF1F6F'
              borderRadius='32px'
              bg='#F0EDF2'
              fontSize='15px'
              fontFamily='Futura Round Medium'
              border='1px solid #F0EDF2'
              lineHeight='19px'
            >
              APAC
            </Text>

            <Text
              p='4px 12px'
              color='#FF1F6F'
              borderRadius='32px'
              bg='#F0EDF2'
              fontSize='15px'
              fontFamily='Futura Round Medium'
              border='1px solid #F0EDF2'
              lineHeight='19px'
            >
              hkg1
            </Text>

            <Text
              p='4px 12px'
              color='#FF1F6F'
              borderRadius='32px'
              bg='#F0EDF2'
              fontSize='15px'
              fontFamily='Futura Round Medium'
              border='1px solid #F0EDF2'
              lineHeight='19px'
            >
              MEGA-i
            </Text>
          </HStack>

          <Heading
            mt='24px'
            lineHeight='44px'
            fontSize='45px'
            fontFamily='Futura Round Bold'
            textTransform='uppercase'
          >
            {detail.current.city}
          </Heading>

          <Text mt='8px' fontSize='19px' lineHeight='23px' mb='60px'>
            A short description that explains something about this city in
            correlation to inter.link
          </Text>

          <VStack align='flex-start' mt='52px'>
            <Text
              lineHeight='23px'
              fontFamily='Futura Round Medium'
              fontSize='19px'
            >
              Direct connections:
            </Text>

            <Wrap spacing='12px' w='100%' mt='16px'>
              {detail.directCities.map((c) => (
                <WrapItem key={c.lat}>
                  <Button {...cityButtonStyle}>
                    <RadioIcon />
                    {c.city}
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
                Option: ({ children, ...props }) => (
                  <chakraComponents.Option {...props}>
                    <chakra.img
                      w='12px'
                      h='12px'
                      mr='6px'
                      src={`images/${props.data.icon}.svg`}
                    />
                    {children}
                  </chakraComponents.Option>
                ),
              }}
              isMulti
              useBasicStyles
              name='colors'
              classNamePrefix='chakra-react-select'
              options={allLocations}
              placeholder='Select a location'
              closeMenuOnSelect={false}
              chakraStyles={locationSelectStyle}
            />
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

export default Connect
