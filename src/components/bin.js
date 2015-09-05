var React = require('react');

var Bin = React.createClass({ 
 
    componentDidMount: function() {
        this.paint(this.props.getContext());
    },
 
    componentDidUpdate: function() {
        this.paint(this.props.getContext());
    },
 
    paint: function(context) {
        console.log('painting');
        console.log({
            x: this.props.x,
            y: this.props.y,
            width: this.props.width,
            height: this.props.height
        })
        context.fillRect(this.props.x, this.props.y, this.props.width, this.props.height);
    },
 
    render: function() {
        return false;
    }

});

module.exports = Bin;