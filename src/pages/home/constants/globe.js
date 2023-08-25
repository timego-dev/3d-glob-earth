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
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import ThreeGlobe from 'three-globe'

import locations from 'assets/json/locations.json'
import countries from 'assets/globe-data-min.json'
import travelHistory from 'assets/my-flights.json'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer'
import { copyJson } from './const'

export const renderAirport = (name) => {
  return `<div
   class='location'
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

export function init() {
  let renderer, cssRenderer, camera, scene, controls, Globe

  // Initialize renderer
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('3d-glob').appendChild(renderer.domElement)

  // Initialize renderer
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

  // window.addEventListener('resize', onWindowResize, false)
  // document.addEventListener('mousemove', onMouseMove)

  // Initialize the Globe
  Globe = new ThreeGlobe({
    waitForGlobeReady: true,
    animateIn: true,
  })
    .showGlobe(false)

    .htmlElementsData(copyJson(locations))
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

    .customLayerData(copyJson(locations))
    .customThreeObject((d) => {
      let circle = new Mesh(
        new CircleGeometry(d.isInactive ? 0.4 : 0.6)
          .translate(0, 0, 1.01)
          .rotateX(Math.PI),
        new MeshBasicMaterial({ color: '#00FECD', side: DoubleSide }),
      )

      const ringInner = d.state === 'planned' ? 1.4 : 0.6

      const ring = new Mesh(
        new RingGeometry(ringInner, 1.5).translate(0, 0, 1).rotateX(Math.PI),
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
  }, 1000)

  const globeMaterial = Globe.globeMaterial()
  globeMaterial.emissive = new Color(0x220038)
  globeMaterial.emissiveIntensity = 0.1
  globeMaterial.shininess = 0.7
  globeMaterial.wireframe = true

  scene.add(Globe)

  return { scene, renderer, cssRenderer, controls, camera, Globe }
}
