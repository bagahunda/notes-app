<template>
  <div class="pad">
    <input type="text" class="pad__title" placeholder="Untitled note" v-model="note.title" v-on:keydown="save">
    <textarea class="pad__text" placeholder="Start writing..." v-model="note.body" v-on:keydown="save"></textarea>

    <footer class="pad__footer">
      <ul class="pad__footer-items">
        <li class="pad__footer-item">Words: {{ wordCount }}</li>
        <li class="pad__footer-item pad__footer-item--right">Last saved: {{ lastSaved }}</li>
      </ul>
    </footer>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'pad',
    computed: {
      ...mapGetters([
        'note',
        'lastSaved',
        'wordCount'
      ])
    },
    methods: {
      ...mapActions([
        'saveNote',
        'startSaveTimeout'
      ]),
      save () {
        if (!this.note.id) {
          this.saveNote()
          return
        }

        this.startSaveTimeout()
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import '~@/assets/scss/placeholders';

  .pad {
    flex: 4;
    display: flex;
    flex-direction: column;

    &__title {
      padding-left: 30px;
      padding-top: 25px;
      font: inherit;
      font-size: 1.6em;
      border: none;
      outline: none;
    }

    &__text {
      flex: 1;
      margin: 0;
      padding: 20px 30px;
      font: inherit;
      line-height: 2;
      border: none;
      outline: none;
      resize: none;
      -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        #fff 5%,
        #fff 95%,
        transparent 100%
      );
    }

    &__footer {
      padding: 20px 30px;
    }
  }

  .pad__footer-items {
    @extend %inline-list
  }

  .pad__footer-item {
    font-size: 0.9em;

    &--right {
      margin-left: auto;
      text-align: right;
    }
  }

</style>
