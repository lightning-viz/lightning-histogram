'use strict';

var LightningVisualization = require('lightning-visualization');
var Histogram = require('./components/histogram');
var React = require('react');

/*
 * Extend the base visualization object
 */
var Visualization = LightningVisualization.extend({
    getDefaultOptions: function() {
        return {
            zoom: true
        };
    },

    init: function() {
        this.render();
    },

    render: function() {
        React.render((React.createElement(Histogram, {bins: this.data.bins, values: this.data.values, width: this.width, height: this.height, zoom: this.options.zoom})), this.el);
    },

    formatData: function(data) {
        return data;
    },

    updateData: function(formattedData) {
        this.data = formattedData;
        this.render();
    },

    appendData: function(formattedData) {
        this.data.values = this.data.values.concat(formattedData.values);
        this.render();
    }

});


module.exports = Visualization;
