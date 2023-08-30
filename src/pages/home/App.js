import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, chakra, Hide, HStack, useMediaQuery } from '@chakra-ui/react'
import Panel from './components/Panel'
import {
  calculateFlightData,
  DEFAULT_LOCATION,
  locationAlias,
  locationByRegion,
  REGION_LABELS,
  REGIONS,
} from './constants/const'
import {
  blurringBlueStyle,
  globStyle,
  mobileGlobStyle,
} from './constants/style'
import { init } from './constants/globe'
import { changeLocCaret } from './components/Panel/styles'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import gsap from 'gsap'
import FilterBar from './components/FilterBar'

function App() {
  const [location, setLocation] = useState({ ...DEFAULT_LOCATION })
  const [nav, setNav] = useState('all')
  const threeCanvas = useRef({
    scene: null,
    renderer: null,
    cssRenderer: null,
    globe: null,
    camera: null,
    controls: null,
  })

  // Only use for show/hide on mobile
  const [visibility, setVisibility] = useState({
    showFilter: false,
    showExploreButton: false,
  })

  const [isMobileResolution] = useMediaQuery(['(max-width: 375px)'])
  const requestRef = useRef(null)

  useEffect(() => {
    if (!isMobileResolution && threeCanvas.current.scene) {
      // Zoom out
      if (!location[locationAlias.reg]) {
        const { x, y } = threeCanvas.current.camera.position

        gsap.to(threeCanvas.current.camera.position, {
          x,
          y,
          z: 400,
          duration: 2,
          ease: 'power2.out',
        })
      }

      // Zoom in
      if (location[locationAlias.reg]) {
        let coords = locationByRegion[location[locationAlias.reg]]

        if (location[locationAlias.ct]) {
          coords = coords.countries.find(
            (cou) => cou.city === location[locationAlias.ct],
          )
        }

        let startPos = threeCanvas.current.camera.position.clone()
        let endPos = threeCanvas.current.Globe.getCoords(coords.lat, coords.lng)

        let depthLevel = [locationAlias.reg, locationAlias.ct].filter(
          (v) => !!location[v],
        ).length

        let camDistance = threeCanvas.current.camera.position.length()
        let maxCamDepth = 400 - depthLevel * 60

        gsap.fromTo(
          threeCanvas.current.camera.position,
          {
            x: startPos.x,
            y: startPos.y,
            z: startPos.z,
          },
          {
            duration: 2,
            ease: 'power2.out',
            x: endPos.x,
            y: endPos.y,
            z: endPos.z,

            onUpdate: () => {
              if (camDistance > maxCamDepth) {
                camDistance -= 1
              }

              if (camDistance < maxCamDepth) {
                camDistance += 1
              }

              threeCanvas.current.camera.position
                .normalize()
                .multiplyScalar(camDistance)

              threeCanvas.current.camera.lookAt(endPos)
            },
          },
        )
      }
    }
  }, [location, isMobileResolution])

  const animate = useCallback((threeCanvas) => {
    if (!threeCanvas?.scene) return

    const { renderer, scene, cssRenderer, camera, controls } = threeCanvas

    camera.lookAt(scene.position)
    controls.update()

    renderer.render(scene, camera)
    cssRenderer.render(scene, camera)

    requestRef.current = requestAnimationFrame(() => animate(threeCanvas))
  }, [])

  const resizeWindow = useCallback(() => {
    const { camera, renderer, cssRenderer } = threeCanvas.current

    if (camera && renderer && cssRenderer) {
      const ratio = isMobileResolution
        ? 375 / 572
        : window.innerWidth / window.innerHeight

      camera.aspect = ratio
      camera.updateProjectionMatrix()

      if (isMobileResolution) {
        const width = window.innerWidth
        renderer.setSize(width, width / ratio)
        cssRenderer.setSize(width, width / ratio)
      } else {
        renderer.setSize(window.innerWidth, window.innerHeight)
        cssRenderer.setSize(window.innerWidth, window.innerHeight)
      }
    }
  }, [isMobileResolution])

  useEffect(() => {
    // Init the globe
    threeCanvas.current = { ...init() }

    // Update the visibility of marker on rotating screen
    threeCanvas.current.controls.addEventListener('change', () =>
      threeCanvas.current.Globe.setPointOfView(
        threeCanvas.current.camera.position,
        threeCanvas.current.Globe.position,
      ),
    )

    resizeWindow()

    setVisibility({
      showFilter: !isMobileResolution,
      showExploreButton: isMobileResolution,
    })

    // Add the resize event
    const controller = new AbortController()
    window.addEventListener('resize', resizeWindow, {
      signal: controller.signal,
    })

    // Animate
    animate(threeCanvas.current)

    return () => {
      // Remove the resize event
      controller.abort()

      cancelAnimationFrame(requestRef.current)

      const globPlace = document.getElementById('3d-glob')
      if (globPlace) globPlace.innerHTML = ''
    }
  }, [animate, resizeWindow, isMobileResolution])

  // useEffect(() => {
  //   setVisibility({
  //     showFilter: !isMobileResolution,
  //     showExploreButton: isMobileResolution,
  //   })
  // }, [isMobileResolution])

  useEffect(() => {
    if (threeCanvas.current.scene) {
      if (nav === 'all') {
        threeCanvas.current.Globe.arcsData(calculateFlightData())
          .arcColor(() => {
            return 'rgba(9, 196, 162, 1)'
          })
          .arcStroke(() => {
            return 0.5
          })

        // threeCanvas.current.Globe.customLayerData(
        //   copyJson(locations),
        // ).htmlElementsData(copyJson(locations))
      } else {
        threeCanvas.current.Globe.arcsData(calculateFlightData())
          .arcColor((e) => {
            return e.state === nav
              ? 'rgba(9, 196, 162, 1)'
              : 'rgba(179, 171, 184, 1)'
          })
          .arcStroke((e) => {
            return e.state === nav ? 0.5 : 0.3
          })

        // let filterLocations = locations.filter((loc) => loc.state === nav)
        //
        // threeCanvas.current.Globe.customLayerData(
        //   copyJson(filterLocations),
        // ).htmlElementsData(copyJson(filterLocations))
      }
    }
  }, [nav])

  const hdChangeLocation = (locationObj) => {
    setLocation((prev) => ({ ...prev, ...locationObj }))
  }

  const switchRegion = useMemo(() => {
    const navIdx = REGIONS.indexOf(location[locationAlias.reg])
    if (navIdx === 1) return { prev: REGIONS[0], forw: REGIONS[2] }

    let [prev, forw] = REGIONS.filter(
      (reg) => reg !== location[locationAlias.reg],
    ).reverse()

    return { prev, forw }
  }, [location])

  const showFilter = useMemo(() => {
    return (
      visibility.showFilter &&
      (!location[locationAlias.reg] || !location[locationAlias.ct])
    )
  }, [visibility.showFilter, location])

  const sphereStyle = useMemo(
    () =>
      !isMobileResolution
        ? { ...globStyle }
        : { ...globStyle, ...mobileGlobStyle },
    [isMobileResolution],
  )

  return (
    <div className='container'>
      <chakra.div {...sphereStyle} id='3d-glob' />

      <Hide breakpoint='(max-width: 375px)'>
        <chakra.div {...blurringBlueStyle} />
      </Hide>

      <Hide breakpoint='(max-width: 375px)'>
        {location[locationAlias.reg] && (
          <HStack
            sizing={8}
            position='absolute'
            right='64px'
            top='64px'
            zIndex={20}
          >
            <Button
              onClick={() =>
                hdChangeLocation({
                  ...DEFAULT_LOCATION,
                  [locationAlias.reg]: switchRegion.prev,
                })
              }
              {...changeLocCaret}
            >
              <ArrowBackIcon fontSize='20px' mr='8px' />
              Go to {REGION_LABELS[switchRegion.prev]?.label}
            </Button>
            <Button
              onClick={() =>
                hdChangeLocation({
                  ...DEFAULT_LOCATION,
                  [locationAlias.reg]: switchRegion.forw,
                })
              }
              {...changeLocCaret}
            >
              Go to {REGION_LABELS[switchRegion.forw]?.label}
              <ArrowForwardIcon ml='8px' fontSize='20px' />
            </Button>
          </HStack>
        )}
      </Hide>

      <FilterBar show={showFilter} state={nav} onChange={setNav} />

      <Panel
        visibility={visibility}
        isMobile={isMobileResolution}
        location={location}
        onLocationChange={hdChangeLocation}
      />
    </div>
  )
}

export default App
