AFRAME.registerTemplate(
    'game',
    /*html*/ ` 
    <a-entity  gltf-model="#car" car scale="0.1 0.1 0.1"></a-entity>
    <a-entity ui="ui: game">
        <a-template name="ui"></a-template>
    </a-entity>
  `,
);
