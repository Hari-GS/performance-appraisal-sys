// components/RecentActivity.jsx
import React from "react";

const activities = [
  {
    id: 1,
    name: "Sachin bhai",
    action: "completed self-review",
    time: "30min ago",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Emma Wilson",
    action: "submitted peer feedback",
    time: "2 hours ago",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    action: "approved team reviews",
    time: "1 day ago",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-primary-dark p-6 rounded-xl shadow-md mt-6">
      <h3 className="font-semibold mb-4 text-lg">Recent activity</h3>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start space-x-4">
            <img
              src={activity.avatar}
              alt={activity.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.name}</span>{" "}
                {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
