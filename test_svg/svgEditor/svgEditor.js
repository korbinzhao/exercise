var SVG_NS = 'http://www.w3.org/2000/svg';

var svg = null,
	shapeObj = null,
	selected = null;//用户选中的属性

var createShapeDiv = document.getElementById('create-shape');
var shapeAttrsDiv = document.getElementById('shape-attrs');
var canvas = document.getElementById('canvas');
var lookTransformDiv = document.getElementById('look-transform');

// 图形及对应默认属性
var shapeInfo = {
    rect: 'x:10,y:10,width:200,height:100,rx:0,ry:0',
    circle: 'cx:200,cy:200,r:50',
    ellipse: 'cx:200,cy:200,rx:80,ry:30',
    line: 'x1:10,y1:10,x2:100,y2:100'
};

// 默认公共属性
var defaultAttrs = {
    fill: '#ffffff',
    stroke: '#ff0000'
};


//创建SVG
createSVG();

createShapeDiv.addEventListener('click', function(e){

	if(e.target.type == 'button'){
		var shapeName = e.target.getAttribute('value').toLowerCase();
		console.log(shapeName);

		//在SVG上创建所需图形
		createShape(shapeName);
	}
});

shapeAttrsDiv.addEventListener('input', function(e){
	shapeObj.setAttribute(e.target.name, e.target.value);
});

lookTransformDiv.addEventListener('input', function(e){
	if(!selected) return;
	selected.setAttribute(e.target.name, e.target.value);

	var translateX = selected.getAttribute('translateX')? selected.getAttribute('translateX') : 0;
	var translateY = selected.getAttribute('translateY')? selected.getAttribute('translateY') : 0;
	var rotate = selected.getAttribute('rotate')? selected.getAttribute('rotate') : 0;
	var scale = selected.getAttribute('scale')? selected.getAttribute('scale') : 1;

	var transObject = {'translateX': translateX, 'translateY': translateY, 'rotate': rotate, 'scale': scale};

	var transformValue = encodeTranform(transObject);

	// console.log(transformValue);

	shapeObj.setAttribute('transform', transformValue);
});

function createSVG(){
	svg = document.createElementNS(SVG_NS, 'svg');

	svg.setAttribute('width','100%');
	svg.setAttribute('height','100%');

	canvas.appendChild(svg);
}

function createShape(shapeName){
		shapeObj = document.createElementNS(SVG_NS, shapeName);

		var attrs = shapeInfo[shapeName].split(',');

		var name = null,
			value = null;

		for(var i = 0; i < attrs.length; i++){
			name = attrs[i].split(':')[0];
			value = attrs[i].split(':')[1];

			shapeObj.setAttribute(name, value);
		}

		for(name in defaultAttrs){
			shapeObj.setAttribute(name, defaultAttrs[name]);
		}

		svg.appendChild(shapeObj);

		selected = shapeObj;

		createShapeHandler(shapeName);
}

function createShapeHandler(shapeName){
	var attrs = shapeInfo[shapeName].split(',');

	shapeAttrsDiv.innerHTML = '';

	var name = null,
		value = null;

	for(var i = 0; i < attrs.length; i++){
		name = attrs[i].split(':')[0];
		value = attrs[i].split(':')[1];

		var label = document.createElement('label');
		label.innerHTML = name;

		var range = document.createElement('input');
		range.setAttribute('type', 'range');
		range.setAttribute('value', value);
		range.setAttribute('name', name);
		range.setAttribute('min', 0);
        range.setAttribute('max', 800);

		var br = document.createElement('br');

		shapeAttrsDiv.appendChild(label);
		shapeAttrsDiv.appendChild(range);
		shapeAttrsDiv.appendChild(br);
	}
} 

function encodeTranform(transObject) {
    return ['translate(', transObject.translateX, ',', transObject.translateY, ') ',
        'rotate(', transObject.rotate, ') ',
        'scale(', transObject.scale, ')'].join('');
}