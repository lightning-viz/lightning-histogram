var Bin = require('./bin');
var AxisWrapper = require('./axis-wrapper');
var Canvas = require('./canvas');
var _ = require('lodash');
var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var utils = require('lightning-client-utils');
var d3 = require('d3');


var Histogram = React.createClass({

    mixins: [PureRenderMixin],

    getDefaultProps: function() {
        return {
          values: []
        };
    },
    
    getInitialState: function() {
        var bins = this.props.bins || Math.round(Math.sqrt(this.props.values.length));
        var histData = d3.layout.histogram().bins(bins)(this.props.values);
        return {
            bins: bins,
            initialBins: bins,
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
        return d3.scale.linear().domain(domain).range([this.props.height, 0]);
    },

    componentWillUpdate: function() {
        var context = this.refs.canvas.getContext('2d');
        context.clearRect(0, 0, this.props.width, this.props.height);
    },

    drawNodes: function() {
        
        var scaleX = this.scaleX();
        var scaleY = this.scaleY();
        var color = utils.getColors(3)[1];

        var x, y, height;
        var width = scaleX(this.state.histData[0].x + this.state.histData[0].dx) - scaleX(this.state.histData[0].x);
        return _.map(this.state.histData, function(d, i) {
            x = scaleX(d.x);
            y = scaleY(d.y);
            height = this.props.height - y;

            return (<Bin x={x} y={y} width={width} height={height} color={color} value={d.y} key={i} />)
        }, this);
    },

    handleZoom: function(zoom) {
        var bins = Math.round(this.state.initialBins * zoom.scale);
        var histData = d3.layout.histogram().bins(bins)(this.props.values);

        this.setState({
            bins: bins,
            histData: histData
        });
    },

    getTicks: function() {
        return Math.min(this.props.width / 25, this.state.bins);
    },

    render: function() {
        return (
            <AxisWrapper width={this.props.width} height={this.props.height} scale={this.scaleX()} ticks={this.getTicks()} innerTickSize={0} onZoomed={this.handleZoom} >
                <Canvas ref="canvas">
                    {this.drawNodes()}
                </Canvas>
            </AxisWrapper>
        )
    }

});


module.exports = Histogram;

