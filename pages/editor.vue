<template>
  <div class="container grid grid-cols-2 gap-2 p-4">
    <div>
      <ul class="sections">
        <li
          v-for="(item, i) in items"
          :key="item.id"
          :class="{ item: true, selected: selectedIndex === i }"
          draggable="true"
          @dragenter.prevent
          @dragover.prevent
          @dragstart="startDrag($event, i)"
          @drop="onDrop($event, i)"
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
import _ from 'lodash'
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

  selectedIndex.value = i

  const top = itemRefs.value[i].offsetTop
  console.log('top', top)
  window.scroll({
    left: 0,
    top: top - 10,
    behavior: 'smooth',
  })
}

const onClickItem = (e, i) => {
  emit('click', e)

  selectedIndex.value = i

  const top = itemRefs.value[i].offsetTop
  console.log('top', top)
  window.scroll({
    left: 0,
    top: top - 10,
    behavior: 'smooth',
  })
}

const startDrag = (event, i) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('index', i)
}

const onDrop = (event, targetIndex) => {
  const srcIndex = parseInt(event.dataTransfer.getData('index'))
  const srcRef = itemRefs.value[srcIndex]
  const srcItem = items.value[srcIndex]

  console.log(srcIndex, targetIndex)

  if (srcIndex > targetIndex) {
    for (let i = srcIndex; i > targetIndex; i--) {
      items.value[i] = items.value[i - 1]
      itemRefs.value[i] = itemRefs.value[i - 1]
    }
    itemRefs.value[targetIndex] = srcRef
    items.value[targetIndex] = srcItem
  } else if (srcIndex < targetIndex) {
    for (let i = srcIndex; i < targetIndex; i++) {
      items.value[i] = items.value[i + 1]
      itemRefs.value[i] = itemRefs.value[i + 1]
    }
    itemRefs.value[targetIndex] = srcRef
    items.value[targetIndex] = srcItem
  } else {
    console.log('same')
  }
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
  @apply border border-slate-100 rounded px-4 py-1 my-4;
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
