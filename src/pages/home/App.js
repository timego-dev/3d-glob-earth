import ThreeGlobe from 'three-globe'
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  PerspectiveCamera,
  PointLight,
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
  globStyle,
  blurringBlueStyle,
  navButtonStyle,
  navbarStyle,
} from './constants/style'
import RadioIcon from './components/Circle'
import typeFaceFutura from '../../assets/Futuratf.json'

var renderer, camera, scene, controls
// let mouseX = 0
// let mouseY = 0
// let windowHalfX = window.innerWidth / 2
// let windowHalfY = window.innerHeight / 2
var Globe

function init() {
  // Initialize renderer
  renderer = new WebGLRenderer({ antialias: true, alpha: true })

  renderer.setClearColor(0x000000, 0)

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.getElementById('3d-glob').appendChild(renderer.domElement)

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
  camera.position.x = 0
  camera.position.y = 0

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
  controls.maxDistance = 500
  controls.rotateSpeed = 0.8
  controls.zoomSpeed = 1
  controls.autoRotate = false

  controls.minPolarAngle = Math.PI / 3.5
  controls.maxPolarAngle = Math.PI - Math.PI / 3

  window.addEventListener('resize', onWindowResize, false)
  // document.addEventListener('mousemove', onMouseMove)
}

// SECTION Globe
function initGlobe() {
  // Initialize the Globe
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .showGlobe(false)
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
      .labelsData(airportHistory.airports)
      .labelColor(() => 'rgba(250, 246, 254, 1)')
      .labelSize((e) => e.size)
      .labelTypeFace(typeFaceFutura)
      .labelText('city')
      .labelResolution(6)
      .labelAltitude(0.03)
      .labelIncludeDot(false)
  }, 1000)

  const globeMaterial = Globe.globeMaterial()
  globeMaterial.emissive = new Color(0x220038)
  globeMaterial.emissiveIntensity = 0.1
  globeMaterial.shininess = 0.7
  globeMaterial.wireframe = true

  scene.add(Globe)

  // scene.children[scene.children?.length - 1].position.set(80, 0, 0)
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
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

function App() {
  const [location, setLocation] = useState({ ...DEFAULT_LOCATION })

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
        <Button {...navButtonStyle} w='127px' variant='ghost'>
          All location
        </Button>
        <Button {...navButtonStyle} w='173px' variant='ghost'>
          <RadioIcon checked />
          Active location
        </Button>
        <Button {...navButtonStyle} w='185px' variant='ghost'>
          <RadioIcon />
          Planned location
        </Button>
      </HStack>

      <Panel location={location} onLocationChange={hdChangeLocation} />
    </div>
  )
}

export default App
