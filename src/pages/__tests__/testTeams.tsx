import {screen, waitFor} from '@testing-library/react';
import {renderWithProviders as render} from 'utils/test';
import * as API from 'state/slices/team';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        // given
        jest.spyOn(API, 'useFetchTeamsQuery').mockImplementationOnce(() => ({error: null, data: undefined, isFetching: true, refetch: null}));

        // when
        render(<Teams />);

        // then
        await waitFor(() => {
            expect(screen.getByTestId('spinner')).toBeInTheDocument();
        });
    });

    it('should render teams list', async () => {
        // given
        const resolved = {
            error: null,
            data: [
                {
                    id: '1',
                    name: 'Team1',
                },
                {
                    id: '2',
                    name: 'Team2',
                },
            ],
            refetch: null,
        };

        jest.spyOn(API, 'useFetchTeamsQuery').mockImplementationOnce(() => resolved);

        // when
        render(<Teams />);

        // then
        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });

        expect(screen.getByText('Team2')).toBeInTheDocument();
    });
});
