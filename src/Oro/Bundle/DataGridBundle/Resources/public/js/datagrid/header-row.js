define([
    './header-cell/header-cell',
    'chaplin',
    './util'
], function(HeaderCell, Chaplin, util) {
    'use strict';

    var HeaderRow;

    HeaderRow = Chaplin.CollectionView.extend({
        tagName: 'tr',
        className: '',
        animationDuration: 0,

        /* Required fby current realization of grid.js, see header initialization code */
        autoRender: true,

        themeOptions: {
            optionPrefix: 'headerRow',
            className: 'grid-header-row'
        },

        initialize: function(options) {
            this.columns = options.columns;
            this.dataCollection = options.dataCollection;

            // itemView function is called as new this.itemView
            // it is placed here to pass THIS within closure
            var _this = this;
            // let descendants override itemView
            if (!this.itemView) {
                this.itemView = function(options) {
                    var column = options.model;
                    var CurrentHeaderCell = column.get('headerCell') || options.headerCell || HeaderCell;
                    var cellOptions = {
                        column: column,
                        collection: _this.dataCollection,
                        themeOptions: {
                            className: 'grid-cell grid-header-cell'
                        }
                    };
                    if (column.get('name')) {
                        cellOptions.themeOptions.className += ' grid-header-cell-' + column.get('name');
                    }
                    _this.columns.trigger('configureInitializeOptions', CurrentHeaderCell, cellOptions);
                    return new CurrentHeaderCell(cellOptions);
                };
            }
            HeaderRow.__super__.initialize.apply(this, arguments);
            this.cells = this.subviews;
        },

        /**
         * Cells is not removed from DOM by Chaplin.CollectionView or their realizations
         * Do that manually as it is critical for FloatingHeader plugin
         */
        removeSubview: util.removeSubview
    });

    return HeaderRow;
});
