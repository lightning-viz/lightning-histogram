var Bin = require('./bin');
var AxisWrapper = require('./axis-wrapper');
var Canvas = require('./canvas');
var _ = require('lodash');
var React = require('react');
var utils = require('lightning-client-utils');
var d3 = require('d3');


var Histogram = React.createClass({displayName: "Histogram",

    getDefaultProps: function() {
        return {
          values: []
        };
    },
    
    getInitialState: function() {
        var bins = this.props.bins || Math.round(Math.sqrt(this.props.values.length));
        var histData = d3.layout.histogram().bins(bins)(this.props.values);
        console.log('bins: ' + bins);
        console.log(histData);
        return {
            bins: bins,
            histData: histData
        };
    },

    scaleX: function() {
        var domain = d3.extent(this.props.values);
        return d3.scale.linear().domain(domain).range([0, this.props.width]);
    },

    scaleY: function() {
        var domain = d3.extent(this.state.histData, function(d) {
            return d.y;
        });
        return d3.scale.linear().domain(domain).range([0, this.props.height]);
    },

    componentWillUpdate: function() {
        var context = this.getDOMNode().getContext('2d');
        context.clearRect(0, 0, this.props.width, this.props.height);
    },

    drawNodes: function() {
        
        var scaleX = this.scaleX();
        var scaleY = this.scaleY();

        var x, y, width, height;
        return _.map(this.state.histData, function(d, i) {
            x = scaleX(d.x);
            y = scaleY(d.y);
            width = scaleX(this.state.histData[0].dx);
            height = this.props.height - y;

            return (React.createElement(Bin, {x: x, y: y, width: width, height: height, key: i}))
        }, this);
    },

    render: function() {
        return (
            React.createElement(AxisWrapper, {width: this.props.width, height: this.props.height, scale: this.scaleX(), ticks: this.state.bins * 2, innerTickSize: 0}, 
                React.createElement(Canvas, null, 
                    this.drawNodes()
                )
            )
        )
    }

});


module.exports = Histogram;

