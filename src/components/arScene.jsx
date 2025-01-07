import React from "react";

const ArScene = ({ qrData }) => {
  return (
    <a-scene embedded arjs>
      <a-marker preset={qrData.preset}>
        <a-entity
          position={qrData.position}
          scale={qrData.scale}
          gltf-model={qrData.gltf_model}
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ArScene;
