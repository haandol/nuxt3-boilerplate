<template>
  <div class="container grid grid-cols-2 gap-2 p-4">
    <div>
      <draggable
        v-model="items"
        class="sections"
        item-key="id"
        @end="onDrop"
      >
        <template #item="{ element, index }">
          <div
            :class="{ item: true, selected: selectedIndex === index }"
            @click="onClickSection($event, index)"
          >
            {{ element.title }}
          </div>
        </template>
      </draggable>
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
import draggable from 'vuedraggable'
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

const onDrop = ({ oldIndex, newIndex }) => {
  console.log('onDrop', oldIndex, newIndex)

  const srcRef = itemRefs.value[oldIndex]

  if (oldIndex > newIndex) {
    for (let i = oldIndex; i > newIndex; i--) {
      itemRefs.value[i] = itemRefs.value[i - 1]
    }
    itemRefs.value[newIndex] = srcRef
  } else if (oldIndex < newIndex) {
    for (let i = oldIndex; i < newIndex; i++) {
      itemRefs.value[i] = itemRefs.value[i + 1]
    }
    itemRefs.value[newIndex] = srcRef
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
