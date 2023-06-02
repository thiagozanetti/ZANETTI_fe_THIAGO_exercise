import {fireEvent, screen} from '@testing-library/react';
import {renderWithProviders} from 'utils/test';
import {setHeader} from 'state/slices/header';
import {AppStore, setupStore} from 'state/store';
import Header from '..';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Header', () => {
    const store: AppStore = setupStore();
    const render = (element: JSX.Element) => renderWithProviders(element, {store});

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render header', () => {
        // given
        store.dispatch(setHeader({title: 'Header', showBackButton: false}));

        // when
        render(<Header/>);

        // then
        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('should render back button in header', () => {
        // given
        store.dispatch(setHeader({title: 'Header', showBackButton: true}));

        // when
        render(<Header/>);

        // then
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should not render back button in header', () => {
        // given
        store.dispatch(setHeader({title: 'Header', showBackButton: false}));

        // when
        render(<Header/>);

        // then
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should navigate back when back button is clicked', () => {
        // given
        store.dispatch(setHeader({title: 'Header', showBackButton: true}));

        // when
        render(<Header/>);
        fireEvent.click(screen.getByRole('button'));

        // then
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(mockUseNavigate).toHaveBeenCalled();
    });
});
