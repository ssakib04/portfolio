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
  uniform float uScroll;
  uniform float uDetail;
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
      float keep = i < 3 ? 1.0 : uDetail;
      v += a * noise(p) * keep;
      p = m * p * 2.03;
      a *= 0.5;
    }
    return v;
  }

  float ridged(vec2 p) {
    return 1.0 - abs(noise(p) * 2.0 - 1.0);
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    p.y -= uScroll * 3.2;
    p += uMouse * 0.07;

    float t = uTime * 0.92;

    float broad = fbm(p * 1.15 + vec2(t * 0.22, -t * 0.16));
    float cross = fbm(p * 1.8 + vec2(-t * 0.18, t * 0.14) + broad * 1.4);
    vec2 warp = vec2(broad, cross) * 1.35;

    float silk = fbm(p * 1.7 + warp + vec2(t * 0.16, t * 0.05));
    float fold = fbm(p * 2.6 + warp * 1.6 + vec2(-t * 0.28, t * 0.2));
    float ridge = ridged(p * 3.4 + warp * 2.1 + vec2(t * 0.42, -t * 0.18));
    float fine = uDetail > 0.5
      ? ridged(p * 8.0 + warp + vec2(t * 0.95, -t * 0.7))
      : ridged(p * 5.0 + vec2(t * 0.6, 0.0));

    vec3 ink = vec3(0.045, 0.028, 0.022);
    vec3 umber = vec3(0.22, 0.10, 0.055);
    vec3 wine = vec3(0.38, 0.09, 0.08);
    vec3 copper = vec3(0.62, 0.30, 0.13);
    vec3 gold = vec3(0.93, 0.74, 0.38);
    vec3 cream = vec3(0.97, 0.90, 0.76);

    float section = fract(uScroll * 1.7);
    vec3 ground = mix(ink, umber, smoothstep(0.12, 0.7, broad));
    ground = mix(ground, wine, smoothstep(0.28, 0.82, cross) * 0.85);
    ground = mix(ground, copper, smoothstep(0.4, 0.86, silk) * 0.55);

    vec3 col = ground;
    col = mix(col, wine, smoothstep(0.4, 0.9, fold) * 0.4);
    float thread = smoothstep(0.46, 0.84, ridge);
    col = mix(col, gold, thread * 0.9);
    col += gold * thread * fine * 0.22;
    col += cream * smoothstep(0.78, 0.97, silk) * 0.16;

    float streak = pow(ridged(vec2(p.x * 1.4 + silk, p.y * 6.0 - t * 0.85)), 5.0);
    col += gold * streak * 0.32;

    col = mix(col, gold, section * 0.06 * thread);

    float vig = smoothstep(1.4, 0.25, length((uv - 0.5) * vec2(1.1, 0.92)));
    col *= mix(0.7, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`

export type SilkHandle = {
  setScroll: (value: number) => void
  destroy: () => void
}

type Options = { animate: boolean }

export function mountSilk(canvas: HTMLCanvasElement, options: Options): SilkHandle {
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
    return { setScroll: () => {}, destroy: () => {} }
  }

  renderer.outputColorSpace = LinearSRGBColorSpace
  renderer.toneMapping = NoToneMapping
  renderer.setClearColor(0x120c09, 1)

  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  const mouse = new Vector2()
  const target = new Vector2()
  const resolution = new Vector2(1, 1)
  const small = window.matchMedia('(max-width: 800px)').matches

  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    toneMapped: false,
    uniforms: {
      uTime: { value: options.animate ? 0 : 2.4 },
      uScroll: { value: 0 },
      uDetail: { value: small ? 0 : 1 },
      uMouse: { value: mouse },
      uResolution: { value: resolution },
    },
  })

  const geometry = new PlaneGeometry(2, 2)
  scene.add(new Mesh(geometry, material))

  const cap = small ? 1 : 1.15

  const resize = () => {
    const width = canvas.clientWidth || 1
    const height = canvas.clientHeight || 1
    const mobile = window.matchMedia('(max-width: 800px)').matches
    material.uniforms.uDetail!.value = mobile ? 0 : 1
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : cap))
    renderer.setSize(width, height, false)
    resolution.set(width, height)
  }
  resize()

  const observer = new ResizeObserver(resize)
  observer.observe(canvas)

  const onMove = (event: PointerEvent) => {
    target.set((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * -2 + 1)
  }
  if (options.animate) window.addEventListener('pointermove', onMove, { passive: true })

  const clock = new Clock()
  let running = options.animate
  let raf = 0

  const render = () => {
    if (options.animate) mouse.lerp(target, 0.06)
    material.uniforms.uTime!.value = options.animate ? clock.getElapsedTime() : 2.4
    renderer.render(scene, camera)
  }

  const loop = () => {
    raf = requestAnimationFrame(loop)
    if (!running || document.visibilityState === 'hidden') return
    render()
  }

  const onVisibility = () => {
    if (!options.animate) return
    if (document.visibilityState === 'visible') clock.start()
    else clock.stop()
  }
  document.addEventListener('visibilitychange', onVisibility)

  render()
  if (options.animate) loop()

  return {
    setScroll: (value: number) => {
      material.uniforms.uScroll!.value = value
      if (!options.animate) render()
    },
    destroy: () => {
      running = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    },
  }
}
