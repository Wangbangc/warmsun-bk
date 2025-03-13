import { onMounted, defineComponent, h, ref, inject } from 'vue'
import { setup } from '@css-render/vue3-ssr'
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DocBefore from './DocBefore.vue'
import HomeHeroImage from './HomeHeroImage.vue'
import AsideAdsAfter from './AsideAdsAfter.vue'
import './index.css';
import {
  NConfigProvider, lightTheme, darkTheme, create,
  NMessageProvider, NLoadingBarProvider,
  NFlex, NGrid, NGridItem, NTabs, NTabPane, NDivider, NSkeleton,
  NInput, NButton, NUpload, NUploadDragger, NSwitch, NTooltip, NRadioGroup, NRadioButton, 
  NText, NP, NH1, NH2, NH3, NH4, NH5, NH6, NAlert, NImage, NImageGroup, NSpin,
} from 'naive-ui'

const naive = create({
  components: [
    NMessageProvider, NLoadingBarProvider,
    NFlex, NGrid, NGridItem, NTabs, NTabPane, NDivider, NSkeleton,
    NInput, NButton, NUpload, NUploadDragger, NSwitch, NTooltip, NRadioGroup, NRadioButton, 
    NText, NP, NH1, NH2, NH3, NH4, NH5, NH6, NAlert, NImage, NImageGroup, NSpin,
    NUpload, NUploadDragger,
  ]
})


const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect')
    return {
      style: collect()
    }
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style
    })
  }
})

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  }
})

const NaiveUIProvider = defineComponent({
  setup() {
    const theme = ref(lightTheme)
    const lightThemeOverrides = {
      common: {
        primaryColor: '#3451b2',
        primaryColorHover: '#3a5ccc',
        primaryColorPressed: '#5672cd',
        primaryColorSuppl: '',
      },
    }
    const darkThemeOverrides = {
      common: {
        primaryColor: '#a8b1ff',
        primaryColorHover: '#5c73e7',
        primaryColorPressed: '#3e63dd',
        primaryColorSuppl: '#a8b1ff',
      },
    }
    const themeOverrides = ref(lightThemeOverrides)

    onMounted(() => {
      theme.value = document.documentElement.classList.contains('dark') ? darkTheme : lightTheme
      themeOverrides.value = document.documentElement.classList.contains('dark') ? darkThemeOverrides : lightThemeOverrides

      const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            theme.value = document.documentElement.classList.contains('dark') ? darkTheme : lightTheme
            themeOverrides.value = document.documentElement.classList.contains('dark') ? darkThemeOverrides : lightThemeOverrides
          }
        }
      })
      const config = { attributes: true, attributeFilter: ['class'] }
      observer.observe(document.documentElement, config)
    })

    return {
      theme, themeOverrides
    }
  },
  render() {
    return h(
      NConfigProvider,
      {
        abstract: true,
        inlineThemeDisabled: true,
        theme: this.theme,
        themeOverrides: this.themeOverrides,
      },
      {
        default: () => [
          h(DefaultTheme.Layout, null, {
            default: this.$slots.default?.(),
            // 'page-bottom': () => h('div', 'page-bottom'),
            // 'doc-top': () => h('div', 'doc-top'),
            // 'doc-bottom': () => h('div', 'doc-bottom'),
            // 'doc-footer-before': () => h('div', 'doc-footer-before'),
            'doc-before': () => h(DocBefore),
            // 'doc-after': () => h('div', 'doc-after'),
            // 'sidebar-nav-before': () => h('div', 'sidebar-nav-before'),
            // 'sidebar-nav-after': () => h('div', 'sidebar-nav-after'),
            // 'aside-top': () => h('div', 'aside-top'),
            // 'aside-bottom': () => h('div', 'aside-bottom'),
            // 'aside-outline-before': () => h('div', 'aside-outline-before'),
            // 'aside-outline-after': () => h('div', 'aside-outline-after'),
            // 'aside-ads-before': () => h('div', 'aside-ads-before'),
            'aside-ads-after': () => h(AsideAdsAfter),
            'home-hero-image': () => h(HomeHeroImage),
          }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
        ]
      }
    )
  }
})

export default {
  extends: DefaultTheme,
  Layout: NaiveUIProvider,
  enhanceApp: ({ app, router, siteData }) => {
    app.use(naive)
    if (import.meta.env.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
    router.onBeforeRouteChange = (to) => {
      if (typeof _hmt !== 'undefined') {// 百度统计
        _hmt.push(['_trackPageview', to]);
      }
    };
  }
};
