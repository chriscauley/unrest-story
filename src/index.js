import StoryCard from './components/StoryCard'
import store from './store'

export { StoryCard }

export default {
  install(app, stories) {
    stories && store.register(stories)
    app.config.globalProperties.$story = {
      complete: store.doStory,
      once: store.doOnce,
    }
  },
  complete: store.doStory,
  once: store.doOnce,
}
