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
    uniform vec2 glow0; 
    uniform vec2 glow1; 
    uniform vec2 glow2; 

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

    float Distance(vec2 p1, vec2 p2)
    {
        return sqrt((p2.x - p1.x)*(p2.x - p1.x) + (p2.y - p1.y)*(p2.y - p1.y));
    }
  
  void main()
  {
      vec2 Uglow0 = glow0.xy/iResolution.xy * 0.5;
      vec2 Uglow1 = glow1.xy/iResolution.xy;
      vec2 Uglow2 = glow2.xy/iResolution.xy;
    //   vec2 Uglow1 = glow1.xy/iResolution.xy;
      
      vec2 u = -1. + 2.0 * uv;
      
      vec2 xy = u - vec2(0.5,0.5) * 0.1;
      float distance0 = Distance(u.xy, Uglow0.xy);
      float distance1 = Distance(u.xy, Uglow1.xy);
      float distance2 = Distance(u.xy, Uglow2.xy);

   xy.x *= iResolution.y/iResolution.x * 1.0;
//    xy.y *= iResolution.x/iResolution.y * sin(u_time/10.) * 0.125;
   float r_ = r(xy);
   vec3 color = vec3(0.);
   color.r += s(s(a(xy.x*.2+u_time*.005,xy.y*.21,xy.x,xy.y),r_),xy.x+xy.y * .1);
   color.g += s(s(a(xy.x*.23,xy.y*.25+u_time*.005,xy.x,xy.y),r_),(xy.x+xy.y)*.15);
   color.b += s(s(a(xy.x*.2,xy.y*.29,xy.x,xy.y),r_),(xy.x+xy.y)*.15);
    // = mix(vec4(color,1.0), vec4(0.0,0.0,0.0, distance));
   // gl_FragColor = vec4(0.0,1.0,0.0, distance0);
    vec4 distanceCol1 = vec4(0.0,1.0,0.0, distance0*2.0);
    vec4 distanceCol2 = vec4(1.0,0.0,0.0, distance1*2.0);
    vec4 distanceCol0 = vec4(0.0,1.0,1.0, distance2*2.0);
    // vec4 outputColor = vec4(color, 1.0) * vec4(0.0,1.0,0.0, distance0* 2.0);
    vec4 outputColor = vec4(color, 1.0);
   // gl_FragColor =  vec4(color, 1.0) + distanceCol1 + distanceCol0 + distanceCol2 + outputColor;
   vec4 colorOut = outputColor * 0.9 + distanceCol1 * (1. - 0.5) + distanceCol0 * (1. - 0.9)+ distanceCol2 * (1. - 0.9);
    gl_FragColor = colorOut; 
}
  

  
  `
  }
});
class HelloBlue extends React.Component {
    
  render() {
    const { u_time, xFactor = 1, yFactor=1, iResolution,  } = this.props;
    // const { u_time, xFactor = 1, yFactor=1, iResolution, birds } = this.props;
    // console.log(xFactor, yFactor);

    // const glows = birds.map( bird => {
    //   return [bird.location.x, bird.location.y];
    // })
   
    // const glow1 = [birds[1].location.x, birds[1].location.y];
    // const glow2 = [birds[2].location.x, birds[2].location.y];

    const glow0 = [100.0, 50.0];
    const glow1 = [200.0, 500.0];
const glow2 = [500.0,400.0];
    
      return (
        <div>
          
        <Node shader={shaders.helloBlue} uniforms={{ u_time, xFactor, yFactor, iResolution, glow0, glow1, glow2 }} />
      
        </div>
      )



    
  }
}

class BG extends React.Component {




  
  render(){
    const { xFactor, yFactor, u_time, birds } = this.props;
 
    return (
      <Surface width={window.innerWidth} height={window.innerHeight}>
          <HelloBlue  u_time={u_time/10} xFactor={xFactor} yFactor={yFactor} birds={birds} iResolution={[window.innerWidth, window.innerHeight]}/>
      </Surface>
  )
  }

}

export default BG


