goog.provide('cauliflowervest.SearchCard');


/**
 * Search form for single volume type.
 */
cauliflowervest.SearchCard = Polymer({
  is: 'cv-search-card',
  properties: {
    title: String,

    type: String,

    value1: String,

    fields: {
      type: Array,
      value: function() {
        return [];
      }
    },
    prefixSearch_: Boolean,
  },

  attached: function() {
    if (this.type == 'bitlocker') {
      this.prefixSearch_ = true;
    }
  },

  onItemSelect_: function() {
    if (this.$.menu.selectedItem &&
        this.fields[this.$.menu.selected][0] == 'created_by') {
      this.$.checkbox.style.display = 'none';
      this.prefixSearch_ = false;
    } else {
      this.$.checkbox.style.display = 'inline-block';
    }
  },

  search_: function() {
    let params = {
      searchType: this.type,
      field: this.fields[this.$.menu.selected][0],
      value: encodeURIComponent(this.value1),
      prefixSearch: '',
    };
    if (this.prefixSearch_) {
      params.prefixSearch = '1';
    }

    this.fire('search', params);
  },
});
