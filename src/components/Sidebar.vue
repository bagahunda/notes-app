<template>
  <aside class="sidebar" v-if="notes">
    <div v-if="notes">
      <note v-for="note in notes" :note="note" :key="note.id"></note>
    </div>
    <div class="sidebar__content" v-else>
      Boo, no notes. Get writing!
    </div>
    <div class="sidebar__content">
      <a href="#" @click.prevent="clearCurrentNote">Start a new note</a>
    </div>
  </aside>
</template>

<script>

  import Note from './Note'
  import { mapGetters, mapActions } from 'vuex'
  // import axios from 'axios'

  export default {
    name: 'sidebar',
    // data () {
    //   return {
    //     notes: null
    //   }
    // },
    computed: {
      ...mapGetters([
        'notes'
      ])
    },
    created () {
      this.getNotes()
    },
    methods: {
      ...mapActions([
        'clearCurrentNote',
        'getNotes'
      ])
    },
    components: {
      Note
    }
  }
</script>

<style lang="scss" scoped>

  .sidebar {
    background-color: #f9f9f9;
    flex: 1;
    height: 100%;
    min-width: 28%;
    border-right: 2px solid #eee;
    overflow-y: scroll;

    &__content {
      padding: 30px;

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }

</style>
