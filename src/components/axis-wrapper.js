var React = require('react');
var d3 = require('d3');
var Axis = require('./axis');
var _ = require('lodash');

var AxisWrapper = React.createClass({

    getDefaultProps: function() {
        return {
          ticks: 5,
          position: 'bottom',
          margin: {
            bottom: 20,
            left: 0,
            top: 0,
            right: 0
          }
        };
    },

    axis: function () {
        return (<Axis
            orientation={this.props.position}
            scale={this.props.scale}
            width={this.getInnerWidth()}
            height={this.getInnerHeight()}
            margin={this.props.margin} 
            innerTickSize={-this.getInnerHeight()}
            ticks={this.props.ticks}
            outerTickSize={0} />);
    },

    getInnerWidth: function() {
        return this.props.width - this.props.margin.left - this.props.margin.right;
    },

    getInnerHeight: function() {
        return this.props.height - this.props.margin.top - this.props.margin.bottom;
    },

    render: function() {
        var children = React.Children.map(this.props.children, function(child, i) {
            return React.cloneElement(child, {ref: 'child', style: {position: 'absolute', marginLeft: this.props.margin.left, marginTop: this.props.margin.top}, width: this.getInnerWidth(), height: this.getInnerHeight()});
        }, this);

        return (
            <div style={{position: 'relative'}}>
                <svg width={this.props.width} height={this.props.height} style={{position: 'absolute'}} ref={'svg'}>
                    {this.axis()}
                </svg>
                {children}
            </div>
        );
    }
});

module.exports = AxisWrapper;
