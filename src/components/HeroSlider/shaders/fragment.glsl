precision mediump float;

uniform sampler2D currentTexture;
uniform sampler2D nextTexture;
uniform sampler2D displacementMap;
uniform float progress;
uniform float intensity;

varying vec2 vUv;

void main() {
    vec4 displacement = texture2D(displacementMap, vUv);
    float displacementFactor = displacement.r * intensity;
    
    vec2 distortedPosition = vec2(vUv.x + progress * (displacementFactor), vUv.y);
    vec4 currentColor = texture2D(currentTexture, distortedPosition);
    vec4 nextColor = texture2D(nextTexture, distortedPosition);

    gl_FragColor = mix(currentColor, nextColor, clamp(progress, 0.0, 1.0));
}
