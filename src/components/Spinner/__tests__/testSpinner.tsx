import {render, screen} from '@testing-library/react';
import {Spinner} from '..';

describe('Spinner', () => {
    it('should render spinner', () => {
        // given

        // when
        render(<Spinner />);

        // then
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
});
