import { useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { request } from "../helpers/axios_helpers";
import { getLayoutedElements } from "../helpers/flowLayout";

export default function OrganizationEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    request("get", "/api/new-employees/by-hr/hierarchy")
      .then((res) => {
        const data = res.data;

        // Map backend data to nodes
        const generatedNodes = data.map((emp, index) => ({
          id: emp.employeeId,
          data: {
            label: `${emp.name} (${emp.designation})`,
          },
          position: { x: 0, y: 0 }, // initial dummy values
        }));

        // Map backend data to edges
        const generatedEdges = data
          .filter((emp) => emp.managerId)
          .map((emp) => ({
            id: `e${emp.managerId}-${emp.employeeId}`,
            source: emp.managerId,
            target: emp.employeeId,
          }));
        
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(generatedNodes, generatedEdges, "TB");

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      })
      .catch((err) => {
        console.error("Failed to fetch hierarchy", err);
      });
  }, []);

  return (
    <div className="w-full h-[90vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
