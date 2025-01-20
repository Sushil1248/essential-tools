import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const Flowchart = ({ flowData }) => {
  // Extract nodes and edges from the flowData
  const nodes = flowData.flatMap((data) => data.nodes);
  const edges = flowData.flatMap((data) => data.edges);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flowchart;