import {screen} from '@testing-library/react';
import {renderWithProviders as render} from 'utils/test';

import UserOverview from '../UserOverview';

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

describe('UserOverview', () => {
    it('should render UserOverview', () => {
        // given

        // when
        render(<UserOverview />);

        // then
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('userName')).toBeInTheDocument();
        expect(screen.getByText('location')).toBeInTheDocument();
    });
});
