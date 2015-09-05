var React = require('react');

var Canvas = React.createClass({displayName: "Canvas",

    getInitialState: function() {
        return {
            radius: this.props.initialRadius
        };
    },

    getContext: function() {
        return React.findDOMNode(this).getContext('2d');
    },

    render: function() {
        var children = React.Children.map(this.props.children, function(child, i) {
            return React.cloneElement(child, {getContext: this.getContext});
        }, this);

        return (
            React.createElement("canvas", {width: this.props.width, height: this.props.height}, 
                children
            )
        )
    }
});


module.exports = Canvas;

