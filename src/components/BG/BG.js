import React from 'react';
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom"; // for React DOM
const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
    precision mediump float;
    varying vec2 uv;
    uniform vec2 iResolution;
    uniform float u_time;
    uniform float xFactor;
    uniform float yFactor;

    vec2 xyRot(float n, in vec2 xy)
	{
		return vec2(xy.x*cos(n)-xy.y*sin(n),
					xy.x*sin(n)+xy.y*cos(n));
	}

float r(vec2 xy)
	{
		vec2 tmp1 = xyRot(1. + xFactor*.000005,xy);
		float tmp2 = 2.+10.*(sin(1. + xFactor*.000005*.1));
		return sqrt(pow(sin(tmp1.x*tmp2),2.) +
					pow(sin(tmp1.y*tmp2),2.));
	}


float a(float m, float n, float x, float y)
	{
		return (x+sin(50.*m))*(y+cos(50. * n))*sin( 10. * yFactor + x*y+m+n);
    }

float s(float n, float r)
	{
		return abs(1.-abs(n-r));
	}


  
  void main()
  {
      vec2 u = -1. + 2.0 * uv;
    vec2 xy = u - vec2(0.5,0.5) * 0.1;
   xy.x *= iResolution.y/iResolution.x * 1.0;
//    xy.y *= iResolution.x/iResolution.y * sin(u_time/10.) * 0.125;
   float r_ = r(xy);
   vec3 color = vec3(0.);
   color.r += s(s(a(xy.x*.2+u_time*.005,xy.y*.21,xy.x,xy.y),r_),xy.x+xy.y * .1);
   color.g += s(s(a(xy.x*.23,xy.y*.25+u_time*.005,xy.x,xy.y),r_),(xy.x+xy.y)*.15);
   color.b += s(s(a(xy.x*.2,xy.y*.29,xy.x,xy.y),r_),(xy.x+xy.y)*.15);
   gl_FragColor = vec4(color,1.0);
}
  

  
  `
  }
});
class HelloBlue extends React.Component {
    
  render() {
    const { u_time, xFactor = 1, yFactor=1, iResolution } = this.props;
    console.log(xFactor, yFactor);
      return (
        <div>
          
        <Node shader={shaders.helloBlue} uniforms={{ u_time, xFactor, yFactor, iResolution }} />
      
        </div>
      )



    
  }
}

class BG extends React.Component {




  
  render(){
    const { xFactor, yFactor, u_time } = this.props;
 
    return (
      <Surface width={window.innerWidth} height={window.innerHeight}>
          <HelloBlue  u_time={u_time/10} xFactor={xFactor} yFactor={yFactor} iResolution={[window.innerWidth, window.innerHeight]}/>
      </Surface>
  )
  }

}

export default BG


