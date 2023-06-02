import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders as render} from 'utils/test';
import * as API from 'state/slices/team';
import {TeamOverviewEx} from 'types';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render team overview users', async () => {
        // given
        const teamOverviewEx: TeamOverviewEx = {
            teamLead: {
                id: '2',
                firstName: 'userData',
                lastName: 'userData',
                displayName: 'userData',
                location: '',
                avatar: '',
            },
            teamMembers: [
                {
                    id: '2',
                    firstName: 'userData',
                    lastName: 'userData',
                    displayName: 'userData',
                    location: '',
                    avatar: '',
                },
                {
                    id: '2',
                    firstName: 'userData',
                    lastName: 'userData',
                    displayName: 'userData',
                    location: '',
                    avatar: '',
                },
                {
                    id: '2',
                    firstName: 'userData',
                    lastName: 'userData',
                    displayName: 'userData',
                    location: '',
                    avatar: '',
                },
            ],
        };

        jest.spyOn(API, 'useFetchTeamOverviewExQuery').mockImplementationOnce(() => ({error: null, data: teamOverviewEx, refetch: null}));

        // when
        render(<TeamOverview />);

        // then
        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(4);
        });
    });
});
