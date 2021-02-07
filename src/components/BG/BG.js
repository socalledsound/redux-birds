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
  void main()
  {
      // vec2 u = 8. * uv/iResolution.x;
        vec2 u = 8. * uv * 30.;
      
      vec2 s = vec2(1.,1.732);
      vec2 a = mod(u     ,s)*2.-s;
      vec2 b = mod(u+s*.5,s)*2.-s;
      
      //gl_FragColor = vec4(.5* min( dot(a,a), dot(b,b) ));
      gl_FragColor = vec4(.2* min( dot(a,a), dot(b,b) ), .8 * min( dot(a,a), dot(b,b) ), .2* min( dot(a,a), dot(b,b) ), 0.7);
  }`
  }
});
class HelloBlue extends React.Component {
    
  render() {
    const { u_time } = this.props;
    return <Node shader={shaders.helloBlue} uniforms={{ u_time }} />;
  }
}

const BG = ({u_time}) => {
    console.log(u_time);
    return (
        <Surface width={window.innerWidth} height={window.innerHeight}>
            <HelloBlue  u_time={u_time/10} iResolution={window.innerWidth/window.innerHeight}/>
        </Surface>
    )
}

export default BG


