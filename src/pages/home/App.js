import ThreeGlobe from 'three-globe'
import {
  AmbientLight,
  CircleGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Fog,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  RingGeometry,
  Scene,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import countries from '../../assets/globe-data-min.json'
import travelHistory from '../../assets/my-flights.json'
import airportHistory from '../../assets/my-airports.json'
import { useEffect, useState } from 'react'
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
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer'

var renderer, cssRenderer, camera, scene, controls
// let mouseX = 0
// let mouseY = 0
// let windowHalfX = window.innerWidth / 2
// let windowHalfY = window.innerHeight / 2
var Globe

function init() {
  // Initialize renderer
  renderer = new WebGLRenderer({ antialias: true })

  renderer.setClearColor(0x000000, 0)

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.getElementById('3d-glob').appendChild(renderer.domElement)

  cssRenderer = new CSS2DRenderer()

  cssRenderer.setSize(window.innerWidth, window.innerHeight)
  cssRenderer.domElement.style.position = 'absolute'
  cssRenderer.domElement.style.top = '-32px'
  cssRenderer.domElement.style.pointerEvents = 'none'

  document.getElementById('3d-glob').appendChild(cssRenderer.domElement)

  // Initialize scene, light
  scene = new Scene()
  // scene.background = new Color('transparent')
  scene.add(new AmbientLight(0xbbbbbb, 0.3))

  // Initialize camera, light
  camera = new PerspectiveCamera()
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  var dLight = new DirectionalLight(0xffffff, 0.8)
  dLight.position.set(-800, 2000, 400)
  camera.add(dLight)

  var dLight1 = new DirectionalLight(0x7982f6, 1)
  dLight1.position.set(-200, 500, 200)
  camera.add(dLight1)

  var dLight2 = new PointLight(0x8566cc, 0.5)
  dLight2.position.set(-200, 500, 200)
  camera.add(dLight2)

  camera.position.z = 400
  camera.position.x = 20000
  camera.position.y = 5000

  camera.zoom = 1.7

  scene.add(camera)

  // Additional effects
  scene.fog = new Fog(0x535ef3, 400, 2000)

  // Helpers
  // const axesHelper = new AxesHelper(800);
  // scene.add(axesHelper);
  // var helper = new DirectionalLightHelper(dLight);
  // scene.add(helper);
  // var helperCamera = new CameraHelper(dLight.shadow.camera);
  // scene.add(helperCamera);

  // Initialize controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dynamicDampingFactor = 0.01
  controls.enablePan = false
  controls.minDistance = 200
  controls.maxDistance = 400
  controls.rotateSpeed = 0.8
  controls.zoomSpeed = 1
  controls.autoRotate = false

  controls.minPolarAngle = Math.PI / 3.5
  controls.maxPolarAngle = Math.PI - Math.PI / 3

  window.addEventListener('resize', onWindowResize, false)
  // document.addEventListener('mousemove', onMouseMove)
}

const renderAirport = (name) => {
  return `<div
   style="color: #FAF6FE;
   background: #ffffff29;
   line-height: 27px;
   font-family: Futura Round Medium;
   padding: 0 24px;
   border-radius: 40px;
   font-size: 16px;
   border: 1px solid rgba(159, 115, 202, 0.5)">
   ${name}
   </div>`
}

// SECTION Globe
function initGlobe() {
  // Initialize the Globe
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .showGlobe(false)

    .htmlElementsData(airportHistory.airports)
    .htmlElement((d) => {
      const el = document.createElement('div')
      el.innerHTML = renderAirport(d.city)
      return el
    })

    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(false)
    // .atmosphereColor("red")
    .atmosphereAltitude(0.25)
    .hexPolygonColor((e) => {
      if (
        ['KGZ', 'KOR', 'THA', 'RUS', 'UZB', 'IDN', 'KAZ', 'MYS'].includes(
          e.properties.ISO_A3,
        )
      ) {
        return 'rgba(255,255,255, 1)'
      } else return 'rgba(255,255,255, 0.7)'
    })

    .customLayerData(airportHistory.airports)
    .customThreeObject((d) => {
      let circle = new Mesh(
        new CircleGeometry(d.isInactive ? 0.4 : 0.6)
          .translate(0, 0, 1.01)
          .rotateX(Math.PI),
        new MeshBasicMaterial({ color: '#00FECD', side: DoubleSide }),
      )

      const ringInner = d.isInactive ? 1.4 : 0.6
      const ringOuter = 1.5

      const ring = new Mesh(
        new RingGeometry(ringInner, ringOuter)
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
    .customThreeObjectUpdate((obj, d) => {
      Object.assign(obj.position, Globe.getCoords(d.lat, d.lng, d.alt))

      obj.lookAt(0, 0, 0)
    })

  // NOTE Arc animations are followed after the globe enters the scene
  setTimeout(() => {
    Globe.arcsData(travelHistory.flights)
      .arcColor((e) => {
        return e.status ? 'rgba(9, 196, 162, 1)' : 'rgba(179, 171, 184, 1)'
      })
      .arcAltitude((e) => {
        return e.arcAlt
      })
      .arcStroke((e) => {
        return e.status ? 0.5 : 0.3
      })
      .arcDashLength(0.5)
      .arcDashGap(4)
      .arcDashAnimateTime(1000)
      .arcsTransitionDuration(1000)
      .arcDashInitialGap((e) => e.order * 1)

    // .pointsData(airportHistory.airports)
    // .pointColor(() => 'aqua')
    // .pointAltitude(0.07)
    // .pointsMerge(true)
    // .pointRadius(0.03)
  }, 1000)

  const globeMaterial = Globe.globeMaterial()
  globeMaterial.emissive = new Color(0x220038)
  globeMaterial.emissiveIntensity = 0.1
  globeMaterial.shininess = 0.7
  globeMaterial.wireframe = true

  scene.add(Globe)
}

// function onMouseMove(event) {
//   mouseX = event.clientX - windowHalfX
//   mouseY = event.clientY - windowHalfY
// console.log("x: " + mouseX + " y: " + mouseY);
// }

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  // windowHalfX = window.innerWidth / 1.5
  // windowHalfY = window.innerHeight / 1.5
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  // camera.position.x +=
  //   Math.abs(mouseX) <= windowHalfX / 2
  //     ? (mouseX / 2 - camera.position.x) * 0.005
  //     : 0
  // camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005
  camera.lookAt(scene.position)
  controls.update()

  let renderers = [renderer, cssRenderer]
  renderers.forEach((r) => r.render(scene, camera))

  requestAnimationFrame(animate)
}

function App() {
  const [location, setLocation] = useState({ ...DEFAULT_LOCATION })
  const [nav, setNav] = useState('all')

  useEffect(() => {
    init()
    initGlobe()
    onWindowResize()
    animate()

    return () => {
      const globPlace = document.getElementById('3d-glob')
      if (globPlace) globPlace.innerHTML = ''
    }
  }, [])

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
