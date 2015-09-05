var React = require('react');
var d3 = require('d3');

var Bin = React.createClass({displayName: "Bin", 

    getDefaultProps: function() {
        return {
            formatter: d3.format(',.0f')
        };
    },
 
    componentDidMount: function() {
        this.paint(this.props.getContext());
    },
 
    componentDidUpdate: function() {
        this.paint(this.props.getContext());
    },

    getFormattedCount: function() {
        return this.props.formatter(this.props.value);
    },
 
    paint: function(context) {
        context.save();
        context.fillStyle = this.props.color;
        context.strokeStyle = 'white';
        context.beginPath();
        context.rect(this.props.x, this.props.y, this.props.width, this.props.height);
        context.fill();
        context.stroke();
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(this.getFormattedCount(), this.props.x + this.props.width / 2, this.props.y + 15);

        context.restore();
    },
 
    render: function() {
        return false;
    }

});

module.exports = Bin;