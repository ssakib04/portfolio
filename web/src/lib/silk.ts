import {
  Clock,
  LinearSRGBColorSpace,
  Mesh,
  NoToneMapping,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three'

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(0.80, 0.60, -0.60, 0.80);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    p += uMouse * 0.055;
    float t = uTime * 0.16;

    vec2 q = vec2(
      fbm(p + vec2(0.0, t)),
      fbm(p + vec2(5.2, -t * 0.75))
    );
    vec2 r = vec2(
      fbm(p + 1.55 * q + vec2(1.7, 9.2) + t * 0.35),
      fbm(p + 1.55 * q + vec2(8.3, 2.8) - t * 0.28)
    );
    float f = fbm(p + r * 1.12);

    vec3 ink = vec3(0.045, 0.038, 0.032);
    vec3 umber = vec3(0.20, 0.11, 0.07);
    vec3 wine = vec3(0.32, 0.09, 0.07);
    vec3 gold = vec3(0.86, 0.70, 0.42);

    vec3 col = mix(ink, umber, smoothstep(0.16, 0.62, f));
    col = mix(col, wine, smoothstep(0.40, 0.8, f) * 0.85);
    float vein = smoothstep(0.5, 0.78, f) * (1.0 - smoothstep(0.86, 0.98, f));
    col = mix(col, gold, vein * 0.92);
    col += gold * vein * 0.18;

    float vig = smoothstep(1.25, 0.2, length((uv - 0.5) * vec2(0.9, 0.78)));
    col *= mix(0.55, 1.0, vig);
    col *= mix(0.72, 1.0, smoothstep(0.0, 0.62, uv.x));

    gl_FragColor = vec4(col, 1.0);
  }
`

type Options = { animate: boolean }

export function mountSilk(canvas: HTMLCanvasElement, options: Options) {
  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false,
    })
  } catch {
    return () => {}
  }

  renderer.outputColorSpace = LinearSRGBColorSpace
  renderer.toneMapping = NoToneMapping
  renderer.setClearColor(0x090807, 1)

  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  const mouse = new Vector2()
  const target = new Vector2()
  const resolution = new Vector2(1, 1)

  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: mouse },
      uResolution: { value: resolution },
    },
  })

  const geometry = new PlaneGeometry(2, 2)
  scene.add(new Mesh(geometry, material))

  const small = window.matchMedia('(max-width: 800px)').matches
  const cap = small ? 1 : 1.35

  const resize = () => {
    const width = canvas.clientWidth || 1
    const height = canvas.clientHeight || 1
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap))
    renderer.setSize(width, height, false)
    resolution.set(width, height)
  }
  resize()

  const observer = new ResizeObserver(resize)
  observer.observe(canvas)

  const onMove = (event: PointerEvent) => {
    target.set((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * -2 + 1)
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  const clock = new Clock()
  let visible = true
  let raf = 0

  const render = () => {
    mouse.lerp(target, 0.045)
    material.uniforms.uTime.value = options.animate ? clock.getElapsedTime() : 8.4
    renderer.render(scene, camera)
  }

  const loop = () => {
    raf = requestAnimationFrame(loop)
    if (!visible || document.visibilityState === 'hidden') return
    render()
  }

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
  })
  intersection.observe(canvas)

  const onVisibility = () => {
    if (document.visibilityState === 'visible' && options.animate) clock.start()
    else clock.stop()
  }
  document.addEventListener('visibilitychange', onVisibility)

  render()
  if (options.animate) loop()

  return () => {
    cancelAnimationFrame(raf)
    observer.disconnect()
    intersection.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('pointermove', onMove)
    geometry.dispose()
    material.dispose()
    renderer.dispose()
  }
}
