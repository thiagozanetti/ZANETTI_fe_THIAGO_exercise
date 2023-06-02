import {fireEvent, screen} from '@testing-library/react';
import {renderWithProviders as render} from 'utils/test';
import {Team} from 'types';
import Card from '..';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Card', () => {
    it('should render card with single column', () => {
        // given
        const columns = [{key: 'columnKey', value: 'columnValue'}];

        // when
        render(<Card columns={columns} />);

        // then
        expect(screen.getByText('columnKey')).toBeInTheDocument();
        expect(screen.getByText('columnValue')).toBeInTheDocument();
    });

    it('should render card with multiple columns', () => {
        // given
        const columns = [
            {key: 'columnKey1', value: 'columnValue1'},
            {key: 'columnKey2', value: 'columnValue2'},
            {key: 'columnKey3', value: 'columnValue3'},
            {key: 'columnKey4', value: ''},
        ];

        // when
        render(<Card columns={columns} />);

        // then
        expect(screen.getByText('columnKey1')).toBeInTheDocument();
        expect(screen.getByText('columnValue1')).toBeInTheDocument();
        expect(screen.getByText('columnKey2')).toBeInTheDocument();
        expect(screen.getByText('columnValue2')).toBeInTheDocument();
        expect(screen.getByText('columnKey3')).toBeInTheDocument();
        expect(screen.getByText('columnValue3')).toBeInTheDocument();
        expect(screen.getByText('columnKey4')).toBeInTheDocument();
    });

    it('should navigate when card is clicked and navigation is enabled', () => {
        // given
        const navProps = {
            id: '1',
            name: 'Team 1',
        } as Team;

        // when
        render(
            <Card
                columns={[{key: 'columnKey', value: 'columnValue'}]}
                url="path"
                navigationProps={navProps}
            />
        );

        fireEvent.click(screen.getByText('columnKey'));

        // then
        expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: navProps});
    });

    it('should not navigate when card is clicked and navigation is disabled', () => {
        // given

        // when
        render(<Card columns={[{key: 'columnKey', value: 'columnValue'}]} hasNavigation={false} />);
        fireEvent.click(screen.getByText('columnKey'));

        // then
        expect(mockUseNavigate).not.toHaveBeenCalled();
    });
});
