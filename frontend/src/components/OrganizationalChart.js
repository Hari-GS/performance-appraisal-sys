import React from "react";
import Tree from "react-d3-tree";
import CustomNode from "./CustomNode";

const containerStyles = {
  width: '100%',
  height: '100vh',
  backgroundColor: '#FFFFFF',
};

const nodeStyles = {
  default: {
    node: {
      circle: {
        fill: '#D7E7FF', // Node background
        stroke: '#001D4B', // Node border
        strokeWidth: 2,
      },
      name: {
        fill: '#001D4B', // Title text color
        fontSize: 14,
        fontWeight: 'bold',
      },
      attributes: {
        fill: '#FF9500', // Subtext color
        fontSize: 12,
      },
    },
  },
};

const data = {
  name: "CEO",
  attributes: {
    role: "Chief Executive Officer",
  },
  children: [
    {
      name: "HR A",
      attributes: {
        role: "HR Manager",
      },
      children: [
        {
          name: "Manager A1",
          attributes: {
            role: "Project Manager",
          },
          children: [
            {
              name: "Lead A1.1",
              attributes: {
                role: "Team Lead",
              },
            },
          ],
        },
      ],
    },
    {
      name: "HR B",
      attributes: {
        role: "HR Manager",
      },
      children: [
        {
          name: "Manager B1",
          attributes: {
            role: "Project Manager",
          },
        },
      ],
    },
  ],
};

export default function OrganizationalChart() {


  return (
    <div style={containerStyles}>
      <Tree
        data={data}
        pathFunc="elbow"
        orientation="vertical"
        translate={{ x: 500, y: 100 }}
        renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} />}
        collapsible={true}
      />
    </div>
  );
}
