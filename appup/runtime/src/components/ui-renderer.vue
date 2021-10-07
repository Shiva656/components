<script>
export default {
  name: 'ui-renderer',

  props: {
    
    group_name: {
      type: String
    },

    pageJson: {
      type: Array
    },
  },

  data() {
    return {
      list: [],
      h: null,
      editing_item: null,
    }
  },

  created() {
    this.h = this.$createElement;
    this.list = this.pageJson;
  },

  render(h) {
    const children = this.list.map(item => this.render_children(item, this.list))

    const dragWrap = h('div', {
      class: {
        'ui-renderer': true
      },
      props: {
        list: this.list,
        disabled: true,
        options: {
          group: this.group_name,
          animation: 250,
          handle: '.handle_item',
        },
        move: this.on_item_move,
      },
      on: {
        change: this.handleChange,
      },
      ref: 'draggable_builder_wrapper',
    }, [...children])

    return dragWrap
  },

  methods: {
    /**
     * @function render_children - recursively render data elements
     * @private
     */
    render_children(item, parent) {
      let sub_child = null

      if (typeof item.children === 'object' && item.children.length) {
        sub_child = item.children.map(child => this.render_children(child, item.children))
      }

      let element = this.h(
        item.item.tag,
        this.get_children_props(item),
        [sub_child],
      )

     return element
    },

    /**
     * @function render_item_toolbar - Renders toolbar with edit, delete, drag buttons
     * @private
     */
    render_item_toolbar(item, parent) {
      return this.h('div', {
        class: {
          'draggable-toolbar': true,
        },
      },
      [
        this.h('b-button', {
          class: {
            handle_item: true,
            'mr-2': true,
          },
          props: {
            size: 'sm',
          },
        }, 'Drag'),

        this.h('b-button', {
          props: {
            size: 'sm',
            variant: 'primary',
          },
          on: {
            click: () => {
              this.editing_item = item
              this.$emit('edit', item)
            },
          },
        }, 'Edit'),

        this.h('b-button', {
          props: {
            size: 'sm',
            variant: 'danger',
          },
          class: {
            'ml-2': true,
          },
          on: {
            click: () => {
              this.remove_child(item, parent)
              this.editing_item = null
              this.$emit('edit', {})
            },
          },
        }, 'Remove'),
      ])
    },

    /**
     * @function handleChange - calls on user drag.
     */
    handleChange() {
      this.$emit('change', this.list)
    },

    /**
     * @function change_current_item_props - change current selected item property.
     * @param {object} new_props - new properties
     * Must be called on property editor save
     */
    change_current_item_props(new_props) {
      Object.keys(new_props).forEach((key) => {
        this.editing_item.item.props[key] = new_props[key]
      })
    },

    /**
     * @function get_children_props - create props for each child of form.
     */
    get_children_props(item) {
      return {
        attrs: {
          ...item.item.props
        },
        domProps: item.item.type === 'element'
          ? { ...item.item.props }
          : {},
        on: {
          click: (e) => {
            if (!item.item.no_wrapper) {
              e.stopPropagation()
              this.$emit('click', item)
            }
          },
          mouseover: (e) => {
            if (!item.item.no_wrapper) {
              e.stopPropagation()
              this.$emit('hover', item)
            }
          },
          blur: (e) => {
            if (item.item.editable) {
              const new_item = { ...item }
              new_item.item.props.innerHTML = e.target.innerText
              item = new_item
              this.editing_item = item
              this.$emit('input', new_item)
            }
          },
        },
      }
    },

    /**
     * @function get_html - Get current template of ui
     * @returns {string} - current teplate string
     */
    get_html() {
      return this.getTemplateString(this.list)
    },

    getTemplateString(arr) {
      let result = ''

      arr.forEach((el) => {
        const current_el_start = `<${el.item.tag}>`
        const current_el_finish = `</${el.item.tag}>`
        let child = ''

        if (el.children && el.children.length) {
          child = this.getTemplateString(el.children)
        }

        result += current_el_start + child + current_el_finish
      })

      return result
    },

    /**
     * @function get_json - Get current json
     * @returns {array} - current json
     */
    get_json() {
      return JSON.parse(JSON.stringify(this.list))
    },

    /**
     * @function set_json - Set current json
     * @param {array} new_data - data to be used
     */
    set_json(new_data) {
      this.list = JSON.parse(JSON.stringify(new_data))
      this.handleChange()
    },

    /**
     * @function remove_child - Removes child from parent
     * @param {object} item - item to delete
     * @param {array} parent - array which conains item to delete
     */
    remove_child(item, parent) {
      const index = parent.indexOf(item)

      if (index > -1) {
        parent.splice(index, 1)
      }

      this.handleChange()
    },
  },
}
</script>
