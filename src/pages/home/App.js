import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, chakra, HStack } from '@chakra-ui/react'
import Panel from './components/Panel'
import { DEFAULT_LOCATION } from './constants/const'
import {
  blurringBlueStyle,
  globStyle,
  navbarStyle,
  navButtonStyle,
} from './constants/style'
import RadioIcon from './components/Circle'
import { init, renderAirport } from './constants/globe'
import locations from 'assets/json/locations.json'
import {
  CircleGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  RingGeometry,
} from 'three'

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
  const newTime = Date.now().valueOf()

  // useEffect(() => {
  //   if (threeCanvas.current.scene) {
  //     requestRef.current = requestAnimationFrame(() => animate(threeCanvas))
  //   }
  //
  //   return () => {
  //     cancelAnimationFrame(requestRef.current)
  //   }
  // }, [])

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
    const { camera, renderer } = threeCanvas.current

    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
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
        threeCanvas.current.Globe.customLayerData([...locations])
        threeCanvas.current.Globe.htmlElementsData([...locations])
      } else {
        let filterLocations = locations.filter((loc) => loc.state === nav)

        let locs = document.getElementsByClassName('location')
        Array.from(locs).forEach((loc) => {
          loc.style.display = 'none'
        })

        threeCanvas.current.Globe.htmlElementsData([
          ...filterLocations,
        ]).htmlElement((d) => {
          const el = document.createElement('div')
          el.innerHTML = renderAirport(d.city)
          return el
        })

        threeCanvas.current.Globe.customLayerData(
          filterLocations,
        ).customThreeObject((d) => {
          let circle = new Mesh(
            new CircleGeometry(d.state === 'planned' ? 0.4 : 0.6)
              .translate(0, 0, 1.01)
              .rotateX(Math.PI),
            new MeshBasicMaterial({ color: '#00FECD', side: DoubleSide }),
          )

          const ringInner = d.state === 'planned' ? 1.4 : 0.6

          const ring = new Mesh(
            new RingGeometry(ringInner, 1.5)
              .translate(0, 0, 1)
              .rotateX(Math.PI),
            new MeshBasicMaterial({
              color: 'rgba(4, 164, 135, 0.5)',
              side: DoubleSide,
            }),
          )

          circle.add(ring)
          ring.lookAt(0, 0, 0)

          return circle
        })

        console.log(threeCanvas.current.Globe)

        // .customThreeObjectUpdate((obj, d) => {
        //   Object.assign(
        //     obj.position,
        //     threeCanvas.current.Globe.getCoords(d.lat, d.lng, d.alt),
        //   )
        //
        //   obj.lookAt(0, 0, 0)
        // })

        cancelAnimationFrame(requestRef.current)
        animate(threeCanvas.current)
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
