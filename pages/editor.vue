<template>
  <div class="container grid grid-cols-2 gap-2 p-4">
    <div>
      <ul class="sections">
        <li
          v-for="(item, i) in items"
          :key="item.id"
          :class="{ item: true, selected: selectedIndex === i }"
          @click.prevent="(e) => onClickSection(e, i)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div>
      <a
        v-for="(item, i) in items"
        :key="item.id"
        ref="itemRefs"
        href="#"
        :class="{ el: true, selected: selectedIndex === i }"
        @click.prevent="(e) => onClickItem(e, i)"
      >
        {{ item.id }}
      </a>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ref } from 'vue'
const emit = defineEmits(['click'])

const items = ref([
  { id: 1, title: 'item1' },
  { id: 2, title: 'item2' },
  { id: 3, title: 'item3' },
  { id: 4, title: 'item4' },
  { id: 5, title: 'item5' },
])

const selectedIndex = ref(null)
const itemRefs = ref([])

const onClickSection = (e, i) => {
  emit('click', e)
  console.log(e, i)

  selectedIndex.value = i

  const top = itemRefs.value[i].offsetTop
  console.log(top)
  window.scroll({
    left: 0,
    top: top - 10,
    behavior: 'smooth',
  })
}

const onClickItem = (e, i) => {
  emit('click', e)
  console.log(e, i)

  selectedIndex.value = i

  const top = itemRefs.value[i].offsetTop
  console.log(top)
  window.scroll({
    left: 0,
    top: top - 10,
    behavior: 'smooth',
  })
}
</script>

<style
  lang="scss"
  scoped
>
.container {
  position: relative;
  behavior: 'smooth';
}

.sections {
  top: 1em;
  position: fixed;
}

.item {
  @apply border border-slate-300 rounded px-4 py-1 my-2;
  cursor: pointer;
  width: 100%;
}

.el {
  @apply block border border-slate-300 rounded my-4;
  height: 580px;
  width: 100%;
}

.selected {
  @apply border-dashed border-red-600;
}
</style>
