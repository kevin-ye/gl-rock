precision mediump float;

attribute vec3 aPosition;
attribute vec3 aNormal;

varying vec3 vNormal;

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;

void main() {
  vNormal = aNormal;

  gl_Position = uProjection * uView * vec4(aPosition, 1.0);
}