'use strict';

var LightningVisualization = require('lightning-visualization');
var Histogram = require('./components/histogram');
var React = require('react');

/*
 * Extend the base visualization object
 */
var Visualization = LightningVisualization.extend({

    init: function() {
        this.render();
    },

    render: function() {
        React.render((React.createElement(Histogram, {bins: this.data.bins, values: this.data.values, width: this.width, height: this.height})), this.el);
    },

    formatData: function(data) {
        return data;
    },

    updateData: function(formattedData) {
        this.data = formattedData;
        this.render();
    },

    appendData: function(formattedData) {    
        /*
         * FILL IN Update this.data to include the newly formatted data
         */

        /*
         * FILL IN Re-render the visualization
         */    
    }

});


module.exports = Visualization;
