import React, { useEffect, useState } from 'react';
import { request } from '../helpers/axios_helpers';
import { SyncLoader } from "react-spinners";

function TeamsCards({ searchQuery = "" }) {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [teamError, setTeamError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Spinner state

  useEffect(() => {
    setIsLoading(true);
    request('get', '/teams')
      .then((response) => {
        setTeams(response.data);
        setFilteredTeams(response.data);
        setTeamError(null);
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
        setTeamError("Couldn't connect to the server");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTeams(teams);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = teams.filter(team =>
        team.teamName?.toLowerCase().includes(lowerQuery) ||
        team.department?.toLowerCase().includes(lowerQuery) ||
        team.projectTitle?.toLowerCase().includes(lowerQuery)
      );
      setFilteredTeams(filtered);
    }
  }, [searchQuery, teams]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
      {isLoading ? (
        <div className="col-span-full flex justify-center mt-32">
          <SyncLoader color="#ff9700" />
        </div>
      ) : teamError ? (
        <p className="text-center col-span-full mt-20">{teamError}</p>
      ) : filteredTeams.length === 0 ? (
        <div className="text-center col-span-full text-gray-400 text-lg mt-20">
          No Teams Created
        </div>
      ) : (
        filteredTeams.map((team) => (
          <div
            key={team.teamIdNumber}
            className="bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-500 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <div className="text-xs text-gray-400 mb-1">
              {team.department || "No Department"}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {team.teamName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-semibold text-orange-600">ID:</span> {team.teamIdNumber}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {team.projectTitle || "No Project Title"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Created on: {team.effectiveStartDate ? new Date(team.effectiveStartDate).toLocaleDateString() : "Unknown"}
            </p>
            <button className="mt-3 px-3 py-1 text-sm border border-orange-500 text-orange-600 rounded hover:bg-orange-50 transition">
              View Team Board
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TeamsCards;
