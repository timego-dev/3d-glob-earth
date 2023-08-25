import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, chakra, HStack } from '@chakra-ui/react'
import Panel from './components/Panel'
import { copyJson, DEFAULT_LOCATION } from './constants/const'
import {
  blurringBlueStyle,
  globStyle,
  navbarStyle,
  navButtonStyle,
} from './constants/style'
import RadioIcon from './components/Circle'
import { init } from './constants/globe'
import locations from 'assets/json/locations.json'

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
  const requestRef = useRef(null)

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

    if ((camera && renderer, cssRenderer)) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
      cssRenderer.setSize(window.innerWidth, window.innerHeight)
    }
  }, [])

  useEffect(() => {
    // Init the globe
    threeCanvas.current = { ...init() }
    resizeWindow()

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

      const globPlace = document.getElementById('3d-glob')
      if (globPlace) globPlace.innerHTML = ''
    }
  }, [resizeWindow])

  useEffect(() => {
    if (threeCanvas.current.scene) {
      if (nav === 'all') {
        threeCanvas.current.Globe.customLayerData(
          copyJson(locations),
        ).htmlElementsData(copyJson(locations))
      } else {
        let filterLocations = locations.filter((loc) => loc.state === nav)

        threeCanvas.current.Globe.customLayerData(
          copyJson(filterLocations),
        ).htmlElementsData(copyJson(filterLocations))
      }
    }
  }, [nav])

  const hdChangeLocation = (key, value) => {
    setLocation((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className='container'>
      <chakra.div {...globStyle} id='3d-glob' />
      <chakra.div {...blurringBlueStyle} />

      <HStack {...navbarStyle}>
        <Button
          {...navButtonStyle}
          bg={nav === 'all' ? 'rgba(81, 36, 117, 1)' : 'transparent'}
          onClick={() => setNav('all')}
          w='127px'
          variant='ghost'
        >
          All locations
        </Button>
        <Button
          {...navButtonStyle}
          bg={nav === 'active' ? 'rgba(81, 36, 117, 1)' : 'transparent'}
          onClick={() => setNav('active')}
          w='173px'
          variant='ghost'
        >
          <RadioIcon checked />
          Active locations
        </Button>
        <Button
          {...navButtonStyle}
          bg={nav === 'planned' ? 'rgba(81, 36, 117, 1)' : 'transparent'}
          onClick={() => setNav('planned')}
          w='185px'
          variant='ghost'
        >
          <RadioIcon />
          Planned locations
        </Button>
      </HStack>

      <Panel location={location} onLocationChange={hdChangeLocation} />
    </div>
  )
}

export default App
