<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const tones = {
  violet: 'tone-violet',
  mint: 'tone-mint',
  rose: 'tone-rose',
  muted: 'tone-muted',
} as const

type Tone = keyof typeof tones

type Slide = {
  img: string
  badge: string
  title: string
  body: string
  footer: string
  tone: Tone
}

type MotifType = 'tooth' | 'bubble' | 'pizza' | 'chicken' | 'worm' | 'bear' | 'cat' | 'wings'

type Motif = {
  type: MotifType
  slot: number
}

const slides: Slide[] = [
  {
    img: 'https://i.postimg.cc/HcCWTT70/IMG-20240508-WA0039.jpg',
    badge: '06 de marzo de 2024',
    title: 'Tan nerviosos y tan nosotros',
    body: 'Ese 06 de marzo llegamos bien nerviosos, sin saber q ahi empezaba una historia q me iba a cambiar el corazon. Yo no sabia q esa nina frente a mi iba a terminar siendo mi amor, mi bebe, mi persona mas importante y esa calma bonita q desde entonces se me quedo pegada al alma.',
    footer: 'No lo esperaba, pero q bendicion haberte conocido, mi amor.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/KKTvX14n/last.jpg',
    badge: '22 de abril',
    title: 'Hoy tambien celebro mi amor por ti',
    body: 'Hoy 22 de abril para mi vuelve a sentirse especial, porque desde siempre me nace celebrar q te amo. No necesito una fecha gigante para acordarme de ti; me basta pensar en tu voz, en tu carita, en tus suenos y en todo lo q hemos avanzado para decir: si, esta mujer vale todo mi amor.',
    footer: 'La amo a mi bebe, hoy y todos los dias q vengan.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/bGnNXZdg/FB-IMG-1768881129936.jpg',
    badge: 'Lo q viene',
    title: 'Tu futuro se ve bien hermoso',
    body: 'Me emociona imaginarte creciendo, estudiando, aprendiendo, llegando mas lejos de lo q a veces tu misma crees. Yo te veo con esa bata, con seguridad, con tu consultorio, con una vida q te haga sentir orgullosa. Y neta, mi amor, quiero verte lograrlo todo sin q se te apague esa ternura tuya.',
    footer: 'Vas a ser una odontologa bien chingona, mi vida.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/1nZFbhRZ/IMG-2025-03-06-17-37-46-356.jpg',
    badge: 'Nuestro camino',
    title: 'Mira cuanto hemos avanzado',
    body: 'Lo bonito de nosotros no es solo lo q ya vivimos, sino todo lo q todavia podemos construir. Hemos aprendido a conocernos mejor, a volvernos mas fuertes, a hablar con mas corazon y a seguir eligiendo esa conexion q no se siente comun. Yo veo el camino y digo: todavia hay muchisimo amor por cuidar.',
    footer: 'Lo nuestro va creciendo, no se queda quieto.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/r0L47XyX/IMG-20250906-WA0005.jpg',
    badge: 'Para tus dias largos',
    title: 'No tienes q cargar todo solita',
    body: 'Si un dia traes escuela, consultorio, cansancio, tareas, practicas y mil cosas en la cabeza, acuerdate q no tienes q ser fuerte todo el tiempo. Yo quiero ser ese lugar donde puedes bajar tantito la guardia, respirar, reirte y sentir q alguien si esta feliz de acompanarte en el proceso.',
    footer: 'Yo estoy para ti, no para estorbarte.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/PpkD0sfj/IMG-20250906-WA0037.jpg',
    badge: 'Tu brillo',
    title: 'Me encanta verte florecer',
    body: 'Me gusta ver como poco a poco te atreves mas, como descubres cosas nuevas, como tu mundo se hace mas grande. Si cantas, si dibujas, si actuas, si estudias, si te equivocas y vuelves a intentar, yo voy a mirarte con orgullo. Porque tu brillo no me quita nada; al contrario, me da mas razones para amarte.',
    footer: 'Brilla bonito, mi bebe, yo aqui te aplaudo.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/CBV89ThQ/IMG20251128215135.jpg',
    badge: 'Odonto girl',
    title: 'Tus manos van a sanar sonrisas',
    body: 'Tu carrera tiene algo muy tuyo: paciencia, cuidado, detalle y corazon. Me encanta pensar q un dia vas a ayudar a personas con esas manitas tuyas, q vas a aprender cada vez mas y q vas a mirar atras diciendo: si pude. Yo siempre voy a creer en ti, incluso cuando tu dia salga medio raro.',
    footer: 'Tu esfuerzo va a hablar por ti, mi doctora hermosa.',
    tone: 'mint',
  },
  {
    img: 'https://i.postimg.cc/PL5BHQ4J/IMG-20250906-WA0008.jpg',
    badge: 'Nuestra paz',
    title: 'Quiero q lo nuestro se sienta ligero',
    body: 'Quiero q cuando pienses en mi no sientas peso, sino calma. Q sepas q conmigo puedes hablar, descansar, bromear, sonar y ser tu. Quiero amarte de una forma q te impulse, q te cuide y q te recuerde q el amor tambien puede ser un espacio tranquilo donde uno crece sin miedo.',
    footer: 'Tu paz tambien me importa, mi amor.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/WFJYpWqK/IMG-20250906-WA0009.jpg',
    badge: 'Mi bebe',
    title: 'Te amo en tus mil versiones',
    body: 'Te amo cuando estas animada, cuando estas timida, cuando estas cansada, cuando traes mil planes, cuando solo quieres estar tranquila. Para mi no tienes q actuar perfecta. Yo amo a la mujer real, la q siente bonito, la q lucha, la q aprende y la q sigue siendo mi chikis aun cuando el mundo se mueve rapido.',
    footer: 'Tu version real siempre me va a importar mas.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/hfR6vBsR/IMG-20260116-WA0079.jpg',
    badge: 'Lo nuevo',
    title: 'Quiero hacerte sentir segura',
    body: 'Yo tambien estoy aprendiendo a amar mejor, mas calmado, mas presente y con mas confianza. No quiero q mi amor te haga sentir encerrada; quiero q te haga sentir acompanada. Q sepas q puedes avanzar, ser tu, tener tus metas y aun asi encontrar en mi un abrazo q no compite con tus suenos.',
    footer: 'Amarte bonito tambien es darte aire.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/FfCwHkW6/IMG20250619135750.jpg',
    badge: 'Disciplina',
    title: 'Yo tambien voy creciendo contigo',
    body: 'Mientras tu avanzas en lo tuyo, yo tambien quiero avanzar en lo mio. Quiero ser un hombre mas fuerte, mas sano, mas seguro y mas claro. No para presumir, sino para llegar a tu vida con energia bonita, con hechos, con madurez y con ese amor q no se queda en palabras.',
    footer: 'Quiero q mi cambio tambien te de paz.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/0rwh9Qpp/IMG20250827182137.jpg',
    badge: 'Equipo',
    title: 'Somos mas fuertes cuando jalamos juntos',
    body: 'Me gusta pensar en nosotros como equipo: tu con tus metas, yo con las mias, y los dos echandonos porras cuando la vida se pone intensa. No se trata de hacerlo perfecto; se trata de cuidarnos, escucharnos y recordar q avanzar juntos tambien puede ser bien bonito.',
    footer: 'Yo quiero caminar contigo, no delante de ti.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/LgKCJtzk/IMG20250901182924.jpg',
    badge: 'Contigo',
    title: 'El tiempo se siente diferente',
    body: 'Hay algo en estar contigo q me acomoda el dia. Puede ser una platica, una risa, un silencio o nomas saber q estas ahi, pero contigo el tiempo se me va bonito. Eso para mi vale un chingo, porque no es cualquier emocion; es esa sensacion de hogar q no se fabrica.',
    footer: 'Contigo hasta lo simple se siente especial.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/f3q1RS20/IMG20250901182932.jpg',
    badge: 'Tu ternura',
    title: 'Tu amor bonito si me llega',
    body: 'A veces haces cosas chiquitas q se me quedan todo el dia. Una palabra, una forma de contestar, una preocupacion tuya, un Nene, una risa. Y yo por dentro digo: ahi esta, ese amor bonito q siento de ella. No necesito q sea perfecto ni enorme; cuando viene de ti, me llega bien profundo.',
    footer: 'Yo si siento tu amor, mi vida.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/Lq50w69t/IMG20250906185950.jpg',
    badge: 'Confianza',
    title: 'Quiero ser tu lugar seguro',
    body: 'Quiero q conmigo puedas decir lo q sientes sin tener q medir cada palabra. Si algo te asusta, si algo te emociona, si algo te sale mal o si algo te ilusiona, quiero estar ahi para escucharte de verdad. No para juzgarte, sino para entenderte y recordarte q puedes con mas de lo q crees.',
    footer: 'Tu voz conmigo siempre tiene espacio.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/qzHSqTLs/IMG20250906190717.jpg',
    badge: 'Detalles',
    title: 'Me nace cuidarte bonito',
    body: 'Mis detalles a veces salen raros, chistosos o bien mios, pero todos nacen de lo mismo: de pensar en ti. Me nace cuidarte, mandarte calma, hacerte reir, recordarte q comas, q descanses, q no te rindas. No es obligacion; es amor saliendome por todos lados.',
    footer: 'Always caring, pero bien Alexis.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/gXwQXcQK/IMG20250906191004.jpg',
    badge: 'Nuestro idioma',
    title: 'Tenemos cositas q solo son nuestras',
    body: 'Me gusta q entre nosotros existan bromas, frases, recuerdos y gestos q para cualquiera serian nada, pero para mi son una caja completa de amor. Eso tambien construye futuro: tener un idioma propio, una complicidad q se queda y una forma de encontrarnos hasta en lo mas cotidiano.',
    footer: 'Lo nuestro tiene su propia forma de latir.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/hzHw9Wqz/IMG20250906191006.jpg',
    badge: 'Tus metas',
    title: 'No sueltes lo q te hace bien',
    body: 'Si algo te ayuda a crecer, no lo sueltes por miedo. Tus clases, tus practicas, tu consultorio, tus gustos, tus ganas de probar cosas nuevas: todo eso tambien es parte de la mujer q estas construyendo. Yo quiero verte llena de vida, no chiquita por complacer al mundo.',
    footer: 'Tu crecimiento tambien es parte de lo q amo.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/HcJRcWRB/IMG20250921132641.jpg',
    badge: 'Mi promesa',
    title: 'Voy a apoyarte con hechos',
    body: 'Quiero q cuando tengas dias de estres no solo escuches un te amo, sino q tambien sientas presencia. Q se note en mi paciencia, en mi forma de hablarte, en mis ganas de entenderte y en como celebro tus avances. El amor bonito tambien se demuestra en lo diario.',
    footer: 'No solo te amo, tambien quiero cuidarte bien.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/d7fSYP3n/IMG20250921132644.jpg',
    badge: 'Sin prisa',
    title: 'Vamos pasito a pasito',
    body: 'No necesito correr ni forzar todo para saber q te amo. Quiero q lo nuestro avance con calma, con confianza, con risas y con ganas reales. Q cada paso nos sume, q cada platica nos acerque y q cada dia se sienta un poquito mas claro para los dos.',
    footer: 'Lo q se cuida con paciencia dura mas bonito.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/67P1XJqZ/IMG20250925181643.jpg',
    badge: 'Cuando dudes',
    title: 'Acuerdate de lo fuerte q eres',
    body: 'Hay dias donde tu cabecita te puede decir q no puedes, pero yo si te veo. Te veo intentando, aprendiendo, levantandote, siendo sensible y aun asi fuerte. No tienes q tener todo resuelto para ser admirable; tu esfuerzo ya dice muchisimo de ti.',
    footer: 'Eres mas fuerte de lo q a veces sientes, mi bebe.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/t7x89ThW/IMG20251122203106.jpg',
    badge: 'Tu calma',
    title: 'Tambien mereces descansar',
    body: 'No todo tiene q ser productividad, escuela, planes y cumplir. Tambien mereces dormir rico, comer algo q te guste, reirte, apagar tantito el mundo y sentir q estas haciendo suficiente. Yo quiero recordarte eso cuando te exijas demasiado.',
    footer: 'Descansar tambien es cuidarte, mi amor.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/w1VSnGhd/IMG20251122203150.jpg',
    badge: 'Rutina bonita',
    title: 'Quiero hacer vida contigo',
    body: 'No pienso solo en momentos enormes; tambien pienso en cosas simples. Pasar por ti, escuchar musica, comprar algo rapido, esperarte despues de un dia pesado, platicar de tonterias, verte estudiar, echarte porras. Esa vida cotidiana contigo se me hace bien bonita.',
    footer: 'Lo simple contigo tambien se siente como planazo.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/RNxyhBdB/IMG20251123165815.jpg',
    badge: 'Orgullo',
    title: 'Quiero q te mires como yo te miro',
    body: 'Ojala un dia puedas verte tantito con mis ojos: hermosa, capaz, tierna, inteligente, valiosa y con un futuro enorme. Yo se q no siempre te vas a sentir asi, pero cuando se te olvide, aqui voy a estar para recordartelo sin cansarme.',
    footer: 'Para mi eres muchisimo, mi chikis.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/LgtyLJTt/IMG20251212201605.jpg',
    badge: 'Juntos',
    title: 'Quiero una historia q nos haga bien',
    body: 'Quiero q lo nuestro sea de esos amores q no solo emocionan, tambien construyen. Q nos den ganas de mejorar, de hablarnos bonito, de cuidarnos la mente, el cuerpo y el corazon. Yo quiero un amor donde los dos podamos crecer sin dejar de sentirnos elegidos.',
    footer: 'Un amor fuerte, pero tambien suavecito.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/TKC4tWXC/IMG20251217203237.jpg',
    badge: 'Mi forma',
    title: 'Te amo con ganas de hacerlo bien',
    body: 'Yo se q amar no es nomas decir cosas bonitas. Amar tambien es escuchar, mejorar, tener paciencia, cuidar los detalles y estar presente cuando importa. Eso quiero darte: un amor q se sienta real, q no te pese y q te recuerde q conmigo puedes ser mi bebe y tambien una mujer enorme.',
    footer: 'Te amo demasiado, y quiero q se note bonito.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/D8QDbMpy/IMG20251217203242.jpg',
    badge: 'Planes',
    title: 'Me emociona pensar en lo q viene',
    body: 'Me emociona pensar en salidas, logros, llamadas, dias tranquilos, nuevas metas, tu carrera avanzando y nosotros aprendiendo a querernos mejor. No necesito saber cada detalle del futuro para saber algo: si estas tu, a mi me dan ganas de echarle mas corazon a todo.',
    footer: 'Contigo el futuro se me antoja bonito.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/vg1kg8Cy/IMG20251219204456.jpg',
    badge: 'Para ti',
    title: 'Nunca olvides lo valiosa q eres',
    body: 'Tu valor no depende de tener todo perfecto, ni de nunca cansarte, ni de nunca dudar. Tu valor esta en quien eres, en como sigues, en tu forma de sentir, en tu inteligencia y en ese corazon tuyo q a mi me hace querer cuidarte un chingo.',
    footer: 'Eres suficiente, mi amor. Mucho mas q suficiente.',
    tone: 'violet',
  },
  {
    img: 'https://i.postimg.cc/GBfSCwtT/IMG20251221132731.jpg',
    badge: 'Hoy y manana',
    title: 'Aqui estoy, celebrandote',
    body: 'Hoy quiero celebrar tu vida, tu proceso, tu sonrisa, tus metas y todo lo q eres. Quiero q esta presentacion se sienta como abrazo, como porra, como te amo y como un aqui estoy. Porque amarte tambien es desear q te vaya hermoso, incluso en los dias q cuestan.',
    footer: 'Siempre voy a estar orgulloso de ti, mi bebe.',
    tone: 'rose',
  },
  {
    img: 'https://i.postimg.cc/9z7scMG4/IMG20260117021830.jpg',
    badge: 'Siempre mi chikis',
    title: 'Te amo y quiero avanzar contigo',
    body: 'Si algo quiero q te quede claro es esto: te amo demasiado. Te amo con esa ilusion de verte crecer, de crecer yo tambien, de cuidarnos mejor y de hacer q lo nuestro se sienta cada vez mas bonito. Desde aquel 06 de marzo hasta todo lo q venga, mi corazon sigue escogiendo celebrarte.',
    footer: 'La amo a mi bebe, y quiero un futuro bonito con ella.',
    tone: 'violet',
  },
]

const motifCycle: MotifType[] = [
  'tooth',
  'bubble',
  'pizza',
  'chicken',
  'worm',
  'bear',
  'cat',
  'wings',
]

const ourThings: MotifType[] = ['pizza', 'chicken', 'worm', 'bear', 'cat', 'wings', 'tooth']
const motifSlots = [1, 2, 3, 4, 5, 6] as const

const currentSlide = ref(0)
const touchStartX = ref(0)
const showIntro = ref(true)
let introTimer: number | undefined

const activeSlide = computed<Slide>(() => slides[currentSlide.value] ?? slides[0]!)
const activeTone = computed(() => tones[activeSlide.value.tone])
const progress = computed(() => `${((currentSlide.value + 1) / slides.length) * 100}%`)
const activeMotifs = computed<Motif[]>(() =>
  motifSlots.map((slot, index) => ({
    slot,
    type: motifCycle[(currentSlide.value + index * 2) % motifCycle.length]!,
  })),
)

const goToSlide = (index: number) => {
  currentSlide.value = Math.min(Math.max(index, 0), slides.length - 1)
}

const nextSlide = () => {
  goToSlide(currentSlide.value + 1)
}

const prevSlide = () => {
  goToSlide(currentSlide.value - 1)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight') {
    nextSlide()
  }

  if (event.key === 'ArrowLeft') {
    prevSlide()
  }
}

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0]?.clientX ?? 0
}

const handleTouchEnd = (event: TouchEvent) => {
  const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.value
  const deltaX = touchEndX - touchStartX.value

  if (Math.abs(deltaX) > 48) {
    deltaX < 0 ? nextSlide() : prevSlide()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  introTimer = window.setTimeout(() => {
    showIntro.value = false
  }, 2800)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)

  if (introTimer) {
    window.clearTimeout(introTimer)
  }
})
</script>

<template>
  <main class="story-shell" :class="activeTone">
    <Transition name="intro">
      <section v-if="showIntro" class="tooth-intro" aria-label="Animacion de diente">
        <div class="tooth-scene">
          <svg class="intro-cat" viewBox="0 0 160 128" aria-hidden="true">
            <path
              class="cat-head"
              d="M31.5 52.5 27.2 18l28.5 20.2a67.9 67.9 0 0 1 48.6 0L132.8 18l-4.3 34.5c7.3 8 11.5 18 11.5 28.7 0 27.4-26.9 49.6-60 49.6s-60-22.2-60-49.6c0-10.7 4.2-20.7 11.5-28.7Z"
            />
            <path class="cat-inner-ear left" d="m42 39-4-12 11 8Z" />
            <path class="cat-inner-ear right" d="m118 39 4-12-11 8Z" />
            <circle class="cat-eye" cx="59" cy="74" r="6" />
            <circle class="cat-eye" cx="101" cy="74" r="6" />
            <path class="cat-nose" d="M75 89h10l-5 6Z" />
            <path class="cat-smile" d="M64 96c7 9 25 9 32 0" />
            <path class="cat-whiskers" d="M48 89H22m26 10H26m86-10h26m-26 10h22" />
          </svg>

          <svg class="tooth" viewBox="0 0 180 190" aria-hidden="true">
            <path
              class="tooth-body"
              d="M89.4 22.5c-14.8-13.8-45.8-12-61.6 6.7C10.7 49.4 15 78.1 28.5 105c9.9 19.7 11.3 46.7 26.9 54.7 12.7 6.5 20.2-12.4 28.2-30.3 3.2-7.1 10.1-7.1 13.3 0 8 17.9 15.6 36.8 28.2 30.3 15.7-8 17-35 26.9-54.7 13.5-26.9 17.8-55.6.7-75.8-15.8-18.7-46.8-20.5-61.6-6.7-.5.5-1.2.5-1.7 0Z"
            />
            <path class="tooth-shine" d="M45.5 48.7c9-12.4 25.7-15.1 37.3-8.8" />
            <circle class="tooth-eye left" cx="67" cy="83" r="5.5" />
            <circle class="tooth-eye right" cx="113" cy="83" r="5.5" />
            <path class="tooth-smile" d="M71 109c11.5 11.3 26.9 11.3 38.4 0" />
            <g class="foam foam-a">
              <circle cx="38" cy="93" r="6" />
              <circle cx="50" cy="87" r="4" />
              <circle cx="55" cy="100" r="5" />
            </g>
            <g class="foam foam-b">
              <circle cx="122" cy="105" r="5" />
              <circle cx="136" cy="98" r="7" />
              <circle cx="145" cy="111" r="4" />
            </g>
          </svg>

          <svg class="brush" viewBox="0 0 220 80" aria-hidden="true">
            <rect class="brush-handle" x="50" y="32" width="150" height="14" rx="7" />
            <rect class="brush-neck" x="32" y="27" width="44" height="24" rx="10" />
            <g class="bristles">
              <rect x="18" y="18" width="8" height="25" rx="4" />
              <rect x="28" y="14" width="8" height="29" rx="4" />
              <rect x="38" y="18" width="8" height="25" rx="4" />
            </g>
          </svg>

          <p class="intro-logo">L&amp;A &lt;3</p>
          <p class="intro-love">mi odontologa favorita Linda Martinez</p>
        </div>
      </section>
    </Transition>

    <section class="deck" @touchstart.passive="handleTouchStart" @touchend.passive="handleTouchEnd">
      <p class="deck-logo" aria-label="Nuestro logo">L&amp;A &lt;3</p>
      <span :key="`sweep-${currentSlide}`" class="dental-sweep" aria-hidden="true"></span>

      <div :key="`charms-${currentSlide}`" class="transition-charms" aria-hidden="true">
        <span
          v-for="motif in activeMotifs"
          :key="`${motif.slot}-${motif.type}`"
          class="motif charm"
          :class="[`motif-${motif.type}`, `charm-slot-${motif.slot}`]"
        ></span>
      </div>

      <figure class="photo-stage">
        <img
          :key="activeSlide.img"
          :src="activeSlide.img"
          alt="Recuerdo de nuestra historia"
          class="memory-photo"
        />
      </figure>

      <article class="message-stage">
        <div class="copy-wrap" :key="activeSlide.title">
          <p class="badge">{{ activeSlide.badge }}</p>
          <h1>{{ activeSlide.title }}</h1>
          <p class="body-copy">{{ activeSlide.body }}</p>
          <p class="closing-line">{{ activeSlide.footer }}</p>
        </div>

        <div class="progress-track" aria-hidden="true">
          <span :style="{ width: progress }"></span>
        </div>

        <div class="controls">
          <button
            class="icon-button"
            type="button"
            title="Atras"
            aria-label="Atras"
            :disabled="currentSlide === 0"
            @click="prevSlide"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.8 5.2 9 12l6.8 6.8-1.9 1.9L5.2 12l8.7-8.7 1.9 1.9Z" />
            </svg>
          </button>

          <span class="counter">{{ currentSlide + 1 }} / {{ slides.length }}</span>

          <button
            class="icon-button"
            type="button"
            title="Adelante"
            aria-label="Adelante"
            :disabled="currentSlide === slides.length - 1"
            @click="nextSlide"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m8.2 18.8 6.8-6.8-6.8-6.8 1.9-1.9 8.7 8.7-8.7 8.7-1.9-1.9Z" />
            </svg>
          </button>
        </div>

        <div class="dot-row" aria-label="Diapositivas">
          <button
            v-for="(_, index) in slides"
            :key="index"
            class="dot"
            :class="{ active: index === currentSlide }"
            type="button"
            :title="`Diapositiva ${index + 1}`"
            :aria-label="`Ir a la diapositiva ${index + 1}`"
            @click="goToSlide(index)"
          />
        </div>

        <div class="our-things" aria-hidden="true">
          <span
            v-for="thing in ourThings"
            :key="thing"
            class="motif thing"
            :class="`motif-${thing}`"
          ></span>
        </div>

        <p class="signature">hecho por atte: el amor de tu vida alexis valdez &lt;3 te amo bebe</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.story-shell {
  --tone-text: #eadcff;
  --tone-strong: #d8b4fe;
  --tone-border: rgba(216, 180, 254, 0.22);
  --tone-surface: rgba(168, 85, 247, 0.14);
  --tone-glow: rgba(236, 72, 153, 0.22);

  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  padding: max(32px, env(safe-area-inset-top)) max(32px, env(safe-area-inset-right))
    max(32px, env(safe-area-inset-bottom)) max(32px, env(safe-area-inset-left));
  overflow: hidden;
  color: #fff7ff;
  background:
    radial-gradient(circle at 18% 12%, rgba(244, 114, 182, 0.38), transparent 32%),
    radial-gradient(circle at 82% 8%, rgba(196, 181, 253, 0.46), transparent 36%),
    radial-gradient(circle at 58% 88%, rgba(168, 85, 247, 0.42), transparent 38%),
    linear-gradient(135deg, #4c1d95 0%, #7e22ce 44%, #be185d 100%);
  display: grid;
  place-items: center;
}

.story-shell::before,
.story-shell::after {
  position: absolute;
  inset: auto;
  width: 42vw;
  height: 42vw;
  min-width: 320px;
  min-height: 320px;
  content: '';
  pointer-events: none;
  filter: blur(32px);
  opacity: 0.34;
}

.story-shell::before {
  top: -18vw;
  left: -10vw;
  background: radial-gradient(circle, rgba(251, 113, 133, 0.9), transparent 62%);
}

.story-shell::after {
  right: -16vw;
  bottom: -18vw;
  background: radial-gradient(circle, rgba(216, 180, 254, 0.96), transparent 64%);
}

.tone-violet {
  --tone-text: #eadcff;
  --tone-strong: #d8b4fe;
  --tone-border: rgba(216, 180, 254, 0.26);
  --tone-surface: rgba(168, 85, 247, 0.16);
  --tone-glow: rgba(216, 180, 254, 0.34);
}

.tone-mint {
  --tone-text: #d9fff2;
  --tone-strong: #8df0d0;
  --tone-border: rgba(141, 240, 208, 0.28);
  --tone-surface: rgba(45, 212, 191, 0.14);
  --tone-glow: rgba(141, 240, 208, 0.26);
}

.tone-rose {
  --tone-text: #ffe4ef;
  --tone-strong: #f9a8d4;
  --tone-border: rgba(249, 168, 212, 0.28);
  --tone-surface: rgba(244, 114, 182, 0.16);
  --tone-glow: rgba(244, 114, 182, 0.34);
}

.tone-muted {
  --tone-text: rgba(255, 247, 255, 0.72);
  --tone-strong: rgba(255, 247, 255, 0.84);
  --tone-border: rgba(255, 247, 255, 0.16);
  --tone-surface: rgba(255, 247, 255, 0.08);
  --tone-glow: rgba(216, 180, 254, 0.24);
}

.deck {
  position: relative;
  z-index: 1;
  isolation: isolate;
  width: min(1120px, 100%);
  min-height: 720px;
  display: grid;
  grid-template-columns: minmax(320px, 0.95fr) minmax(360px, 1.05fr);
  overflow: hidden;
  border: 1px solid rgba(255, 247, 255, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.18), transparent 34%), rgba(91, 33, 182, 0.46);
  box-shadow:
    0 24px 70px rgba(76, 29, 149, 0.3),
    0 0 48px var(--tone-glow);
  backdrop-filter: blur(22px);
}

.deck-logo {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 6;
  margin: 0;
  padding: 9px 12px;
  border: 1px solid rgba(255, 247, 255, 0.36);
  border-radius: 8px;
  color: #fff7ff;
  background: rgba(126, 34, 206, 0.42);
  box-shadow: 0 12px 28px rgba(76, 29, 149, 0.22);
  font-size: 0.9rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0;
}

.dental-sweep {
  position: absolute;
  inset: -25% auto -25% -55%;
  z-index: 4;
  width: 42%;
  pointer-events: none;
  background:
    radial-gradient(circle at 28% 42%, rgba(255, 247, 255, 0.7) 0 6px, transparent 7px),
    radial-gradient(circle at 62% 54%, rgba(216, 180, 254, 0.7) 0 4px, transparent 5px),
    linear-gradient(100deg, transparent 0%, rgba(255, 247, 255, 0.28) 44%, transparent 74%);
  filter: blur(1px);
  transform: skewX(-16deg);
  animation: dentalSweep 820ms ease both;
}

.transition-charms {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
}

.photo-stage {
  position: relative;
  z-index: 2;
  min-height: 720px;
  margin: 0;
  padding: 18px;
  border-right: 1px solid rgba(255, 247, 255, 0.16);
  background:
    linear-gradient(180deg, rgba(255, 247, 255, 0.16), transparent), rgba(88, 28, 135, 0.36);
  display: grid;
  place-items: center;
}

.memory-photo {
  width: 100%;
  height: 100%;
  max-height: 684px;
  object-fit: contain;
  border: 1px solid var(--tone-border);
  border-radius: 8px;
  background: rgba(76, 29, 149, 0.24);
  box-shadow:
    0 18px 38px rgba(76, 29, 149, 0.32),
    0 0 28px rgba(249, 168, 212, 0.18);
  animation: photoIn 300ms ease both;
}

.message-stage {
  position: relative;
  z-index: 2;
  min-width: 0;
  padding: 56px;
  display: grid;
  grid-template-rows: 1fr auto auto auto;
  gap: 22px;
}

.copy-wrap {
  align-self: center;
  animation: copyIn 260ms ease both;
}

.badge {
  width: fit-content;
  margin-bottom: 22px;
  padding: 8px 12px;
  border: 1px solid var(--tone-border);
  border-radius: 8px;
  color: var(--tone-text);
  background: var(--tone-surface);
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1 {
  max-width: 12ch;
  color: #ffffff;
  font-size: 3.05rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0;
  text-wrap: balance;
}

.body-copy {
  margin-top: 28px;
  max-width: 58ch;
  color: rgba(255, 247, 255, 0.84);
  font-size: 1.05rem;
  line-height: 1.85;
}

.closing-line {
  margin-top: 22px;
  max-width: 50ch;
  color: var(--tone-text);
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.7;
}

.progress-track {
  width: 100%;
  height: 4px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 247, 255, 0.18);
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--tone-strong);
  box-shadow: 0 0 22px var(--tone-glow);
  transition: width 240ms ease;
}

.controls {
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  gap: 18px;
}

.icon-button {
  width: 48px;
  height: 48px;
  border: 1px solid var(--tone-border);
  border-radius: 50%;
  color: var(--tone-text);
  background: var(--tone-surface);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background 160ms ease,
    opacity 160ms ease;
}

.icon-button svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.icon-button:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--tone-strong);
  background: rgba(255, 247, 255, 0.14);
}

.icon-button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.counter {
  justify-self: center;
  color: rgba(255, 247, 255, 0.72);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0;
}

.dot-row {
  min-height: 28px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 9px;
  height: 9px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 247, 255, 0.34);
  cursor: pointer;
  transition:
    transform 160ms ease,
    background 160ms ease,
    box-shadow 160ms ease;
}

.dot.active {
  background: var(--tone-strong);
  box-shadow: 0 0 16px var(--tone-glow);
  transform: scale(1.35);
}

.our-things {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  min-height: 38px;
}

.signature {
  margin: -4px auto 0;
  max-width: 46ch;
  color: rgba(255, 247, 255, 0.82);
  font-size: 0.82rem;
  font-weight: 900;
  line-height: 1.45;
  text-align: center;
  text-transform: uppercase;
}

.motif {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  filter: drop-shadow(0 8px 12px rgba(76, 29, 149, 0.24));
}

.motif::before,
.motif::after {
  position: absolute;
  content: '';
}

.thing {
  width: 31px;
  height: 31px;
  animation: thingFloat 2600ms ease-in-out infinite;
}

.thing:nth-child(2n) {
  animation-delay: 260ms;
}

.thing:nth-child(3n) {
  animation-delay: 520ms;
}

.charm {
  position: absolute;
  opacity: 0;
  animation: charmFloat 1150ms ease-out both;
}

.charm-slot-1 {
  top: 9%;
  left: 8%;
  animation-delay: 40ms;
}

.charm-slot-2 {
  top: 18%;
  right: 13%;
  animation-delay: 120ms;
}

.charm-slot-3 {
  top: 48%;
  left: 45%;
  animation-delay: 200ms;
}

.charm-slot-4 {
  right: 8%;
  bottom: 18%;
  animation-delay: 280ms;
}

.charm-slot-5 {
  bottom: 10%;
  left: 14%;
  animation-delay: 360ms;
}

.charm-slot-6 {
  top: 63%;
  right: 40%;
  animation-delay: 440ms;
}

.motif-tooth::before {
  inset: 3px 6px 2px;
  border: 2px solid rgba(216, 180, 254, 0.92);
  border-radius: 50% 50% 44% 44% / 46% 46% 66% 66%;
  background: #fff7ff;
}

.motif-tooth::after {
  top: 10px;
  left: 15px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #a855f7;
  box-shadow:
    -5px -1px 0 #a855f7,
    5px -1px 0 #a855f7,
    0 8px 0 -1px #f472b6;
}

.motif-bubble::before {
  inset: 5px;
  border: 2px solid rgba(255, 247, 255, 0.88);
  border-radius: 50%;
  background: rgba(255, 247, 255, 0.24);
}

.motif-bubble::after {
  top: 4px;
  right: 2px;
  width: 11px;
  height: 11px;
  border: 2px solid rgba(255, 247, 255, 0.76);
  border-radius: 50%;
  background: rgba(255, 247, 255, 0.18);
}

.motif-pizza::before {
  top: 3px;
  left: 4px;
  width: 28px;
  height: 28px;
  border-radius: 5px 5px 10px 10px;
  background:
    radial-gradient(circle at 42% 50%, #ef4444 0 3px, transparent 4px),
    radial-gradient(circle at 62% 72%, #ef4444 0 3px, transparent 4px),
    linear-gradient(135deg, #fef08a 0 72%, #f97316 73%);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  transform: rotate(14deg);
}

.motif-pizza::after {
  top: 25px;
  left: 9px;
  width: 21px;
  height: 5px;
  border-radius: 999px;
  background: #f59e0b;
  transform: rotate(14deg);
}

.motif-chicken::before {
  top: 8px;
  left: 9px;
  width: 21px;
  height: 18px;
  border-radius: 62% 48% 58% 42%;
  background:
    radial-gradient(circle at 68% 34%, rgba(255, 247, 255, 0.35) 0 3px, transparent 4px), #c2410c;
  transform: rotate(-24deg);
}

.motif-chicken::after {
  top: 21px;
  left: 3px;
  width: 14px;
  height: 7px;
  border-radius: 999px;
  background:
    radial-gradient(circle at 1px 4px, #fff7ff 0 4px, transparent 5px),
    linear-gradient(90deg, #fff7ff 0 100%);
  transform: rotate(-28deg);
}

.motif-worm::before {
  top: 14px;
  left: 2px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #f472b6;
  box-shadow:
    8px -4px 0 #f9a8d4,
    16px -1px 0 #fb7185,
    24px -5px 0 #e879f9;
  transform: rotate(-7deg);
}

.motif-worm::after {
  top: 9px;
  left: 27px;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #6d28d9;
}

.motif-bear::before {
  top: 9px;
  left: 7px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #c084fc;
  box-shadow:
    -7px -6px 0 -1px #c084fc,
    7px -6px 0 -1px #c084fc;
}

.motif-bear::after {
  top: 18px;
  left: 13px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #4c1d95;
  box-shadow:
    8px 0 0 #4c1d95,
    4px 6px 0 -1px #fff7ff;
}

.motif-cat::before {
  top: 8px;
  left: 5px;
  width: 24px;
  height: 22px;
  border-radius: 45% 45% 52% 52%;
  background: #f9a8d4;
  clip-path: polygon(0 100%, 0 26%, 20% 0, 36% 22%, 64% 22%, 80% 0, 100% 26%, 100% 100%);
}

.motif-cat::after {
  top: 17px;
  left: 12px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #581c87;
  box-shadow:
    10px 0 0 #581c87,
    5px 7px 0 -1px #fff7ff;
}

.motif-wings::before {
  top: 10px;
  left: 4px;
  width: 26px;
  height: 18px;
  border-radius: 70% 28% 70% 34%;
  background:
    radial-gradient(circle at 82% 20%, rgba(255, 247, 255, 0.45) 0 3px, transparent 4px), #fb923c;
  transform: rotate(-18deg);
}

.motif-wings::after {
  top: 18px;
  right: 1px;
  width: 10px;
  height: 8px;
  border-radius: 999px;
  background: #fef3c7;
  transform: rotate(-18deg);
}

.tooth-intro {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 50% 42%, rgba(255, 247, 255, 0.42), transparent 30%),
    linear-gradient(135deg, #7e22ce 0%, #a21caf 48%, #f472b6 100%);
}

.tooth-scene {
  position: relative;
  width: min(360px, 80vw);
  height: 320px;
  display: grid;
  place-items: center;
  animation: introFloat 1800ms ease-in-out infinite;
}

.intro-cat {
  position: absolute;
  top: -10px;
  left: 50%;
  z-index: 4;
  width: 150px;
  transform: translateX(-50%);
  animation: catHello 1400ms ease-in-out infinite;
  filter: drop-shadow(0 14px 20px rgba(76, 29, 149, 0.24));
}

.cat-head {
  fill: #f9a8d4;
  stroke: rgba(255, 247, 255, 0.82);
  stroke-width: 5;
}

.cat-inner-ear,
.cat-nose {
  fill: #fff7ff;
}

.cat-eye {
  fill: #5b21b6;
  animation: blink 2400ms ease-in-out infinite;
  transform-origin: center;
}

.cat-smile,
.cat-whiskers {
  fill: none;
  stroke: #5b21b6;
  stroke-linecap: round;
  stroke-width: 5;
}

.tooth {
  width: 210px;
  overflow: visible;
  filter: drop-shadow(0 20px 32px rgba(76, 29, 149, 0.28));
}

.tooth-body {
  fill: #fff7ff;
  stroke: rgba(216, 180, 254, 0.9);
  stroke-width: 5;
}

.tooth-shine,
.tooth-smile {
  fill: none;
  stroke: #a855f7;
  stroke-linecap: round;
  stroke-width: 7;
}

.tooth-shine {
  opacity: 0.5;
}

.tooth-eye {
  fill: #6d28d9;
  animation: blink 2400ms ease-in-out infinite;
  transform-origin: center;
}

.foam {
  fill: #e9d5ff;
  opacity: 0;
  animation: foamPop 900ms ease-in-out infinite;
}

.foam-b {
  animation-delay: 260ms;
}

.brush {
  position: absolute;
  top: 132px;
  left: 50%;
  width: 220px;
  transform-origin: 32px 36px;
  animation: brushMove 820ms ease-in-out infinite;
}

.brush-handle {
  fill: #f0abfc;
}

.brush-neck {
  fill: #f9a8d4;
}

.bristles rect {
  fill: #cffafe;
}

.intro-love {
  position: absolute;
  bottom: 18px;
  left: 50%;
  width: max-content;
  max-width: 90vw;
  margin: 0;
  padding: 10px 14px;
  border: 1px solid rgba(255, 247, 255, 0.36);
  border-radius: 8px;
  color: #fff7ff;
  background: rgba(76, 29, 149, 0.18);
  font-size: 0.92rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
  transform: translateX(-50%);
}

.intro-logo {
  position: absolute;
  top: 18px;
  left: 50%;
  margin: 0;
  padding: 10px 14px;
  border: 1px solid rgba(255, 247, 255, 0.42);
  border-radius: 8px;
  color: #fff7ff;
  background: rgba(126, 34, 206, 0.24);
  box-shadow: 0 12px 28px rgba(76, 29, 149, 0.2);
  font-size: 1rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0;
  transform: translateX(-50%);
}

.intro-enter-active,
.intro-leave-active {
  transition:
    opacity 420ms ease,
    transform 420ms ease;
}

.intro-enter-from,
.intro-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

@keyframes brushMove {
  0%,
  100% {
    transform: translateX(-112px) rotate(-10deg);
  }

  50% {
    transform: translateX(-34px) rotate(8deg);
  }
}

@keyframes dentalSweep {
  from {
    opacity: 0;
    transform: translateX(0) skewX(-16deg);
  }

  25% {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translateX(390%) skewX(-16deg);
  }
}

@keyframes charmFloat {
  0% {
    opacity: 0;
    transform: translateY(18px) scale(0.66) rotate(-14deg);
  }

  32% {
    opacity: 0.95;
  }

  100% {
    opacity: 0;
    transform: translateY(-72px) scale(1.15) rotate(18deg);
  }
}

@keyframes thingFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

@keyframes catHello {
  0%,
  100% {
    transform: translateX(-50%) rotate(-2deg);
  }

  50% {
    transform: translateX(-50%) rotate(2deg) translateY(-4px);
  }
}

@keyframes foamPop {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.72);
  }

  45%,
  75% {
    opacity: 0.95;
    transform: scale(1);
  }
}

@keyframes blink {
  0%,
  88%,
  100% {
    transform: scaleY(1);
  }

  92% {
    transform: scaleY(0.12);
  }
}

@keyframes introFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes photoIn {
  from {
    opacity: 0;
    transform: scale(0.985);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes copyIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .story-shell {
    padding: max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right))
      max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
    place-items: start center;
  }

  .deck {
    min-height: 0;
    grid-template-columns: 1fr;
  }

  .photo-stage {
    min-height: 380px;
    height: 48vh;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 247, 255, 0.16);
  }

  .memory-photo {
    max-height: calc(48vh - 36px);
  }

  .message-stage {
    padding: 28px;
  }

  h1 {
    max-width: 12ch;
    font-size: 2.25rem;
    line-height: 1.02;
  }

  .body-copy {
    margin-top: 22px;
    font-size: 1rem;
    line-height: 1.75;
  }
}

@media (max-width: 520px) {
  .story-shell {
    padding: max(10px, env(safe-area-inset-top)) max(10px, env(safe-area-inset-right))
      max(10px, env(safe-area-inset-bottom)) max(10px, env(safe-area-inset-left));
  }

  .photo-stage {
    min-height: 286px;
    height: 39svh;
    padding: 12px;
  }

  .memory-photo {
    max-height: calc(39svh - 24px);
  }

  .message-stage {
    padding: 22px;
    gap: 18px;
  }

  .badge {
    margin-bottom: 18px;
    font-size: 0.72rem;
  }

  h1 {
    font-size: 2rem;
  }

  .controls {
    grid-template-columns: 44px 1fr 44px;
    gap: 12px;
  }

  .icon-button {
    width: 44px;
    height: 44px;
  }

  .tooth-scene {
    height: 280px;
  }

  .tooth {
    width: 188px;
  }

  .brush {
    top: 116px;
    width: 196px;
  }

  .intro-cat {
    top: -2px;
    width: 128px;
  }

  .thing {
    width: 27px;
    height: 27px;
  }

  .signature {
    font-size: 0.72rem;
  }

  .deck-logo {
    top: 12px;
    right: 12px;
    font-size: 0.78rem;
  }

  .intro-logo {
    top: 12px;
    font-size: 0.92rem;
  }
}
</style>
