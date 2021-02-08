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
  
  void main()
  {
      // vec2 u = 8. * uv/iResolution.x;
        vec2 u = (uv * 8. ) + (500. * sin(u_time/200. * xFactor));
      
      vec2 s = vec2(2.,1.732);
      vec2 a = mod(u ,s) * 2.-s;
      vec2 b = mod(u+s *.5,s)* 2. -s;
      
      //gl_FragColor = vec4(.5* min( dot(a,a), dot(b,b) ));
      gl_FragColor = vec4(xFactor * min( dot(a,b), dot(b, iResolution) ), (xFactor + sin((u_time+100.))/10.)  * min( dot(a,a), dot(b,b) ), xFactor * min( dot(a,a), dot(a,b) ), 0.5);
  }`
  }
});
class HelloBlue extends React.Component {
    
  render() {
    const { u_time, xFactor = 1, iResolution } = this.props;
   
      return (
        <div>
          
        <Node shader={shaders.helloBlue} uniforms={{ u_time, xFactor, iResolution }} />
      
        </div>
      )



    
  }
}

class BG extends React.Component {




  
  render(){
    const { xFactor, u_time } = this.props;
 
    return (
      <Surface width={window.innerWidth} height={window.innerHeight}>
          <HelloBlue  u_time={u_time/10} xFactor={xFactor} iResolution={[window.innerWidth, window.innerHeight]}/>
      </Surface>
  )
  }

}

export default BG


