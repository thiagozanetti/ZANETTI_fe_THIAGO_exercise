import {FetchBaseQueryError, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Team, TeamOverview, TeamOverviewEx, UserData} from 'types';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchTeams: builder.query<Team[], void>({
        query() {
          return '/teams';
        },
      }),
      fetchTeamOverview: builder.query<TeamOverview, string>({
        query(teamID) {
          return `/teams/${teamID}`;
        },
      }),
      fetchTeamOverviewEx: builder.query<TeamOverviewEx, string>({
        async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
          const resultTeamOverview = await fetchWithBQ(`/teams/${arg}`);

          if (resultTeamOverview.error) {
            return {error: resultTeamOverview.error as FetchBaseQueryError};
          }

          const {teamLeadId, teamMemberIds = []} = resultTeamOverview.data as TeamOverview;

          const resultTeamLead = await fetchWithBQ(`/users/${teamLeadId}`);

          if (resultTeamLead.error) {
            return {error: resultTeamLead.error as FetchBaseQueryError};
          }

          const teamLead = resultTeamLead.data as UserData;

          const teamMembers: UserData[] = [];

          for (const teamMemberId of teamMemberIds) {
            const resultUserData = await fetchWithBQ(`/users/${teamMemberId}`);

            if (resultUserData.error) {
              return {error: resultUserData.error as FetchBaseQueryError};
            }

            teamMembers.push(resultUserData.data as UserData);
          }

          return {
            data: {
              teamLead,
              teamMembers,
            },
          };
        },
      }),
      fetchUserData: builder.query<UserData, string>({
        query(userID) {
          return `/users/${userID}`;
        },
      }),
    };
  },
});

export const {useFetchTeamsQuery, useFetchTeamOverviewQuery, useFetchTeamOverviewExQuery, useFetchUserDataQuery} = apiSlice;
export default apiSlice;