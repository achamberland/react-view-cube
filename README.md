# react-view-cube

A template made with React for websites with less than 6 views. Each view is a side of a cube, navigation rotates the cube.

[Demo](http://achamberland.com/)
-------
A demo template can found here: <http://achamberland.com/>

To see the effect, use the arrow keys or click the left/right arrows on each face of the cube. The menu and contact links in the header rotate the cube up or down.


Build
-------
To edit and build you'll need npm and gulp installed first.  
Gulp will make builds from Sass / ES6 / Browserify files.

To build, navigate to the react-cube-view folder in the command line and type `gulp`


Future Plans
-------
To let any react component be added as a view of the cube with a simple call like:  
`Cube.addFace( {{Component}}, {{faceIndex}}, {{verticalPos}} );`
