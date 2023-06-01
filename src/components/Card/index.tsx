import {useNavigate} from 'react-router-dom';
import {Team, UserData} from 'types';
import {Container} from './styles';

interface Props {
    id?: string;
    url?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    navigationProps?: UserData | Team;
}

const Card = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
}: Props): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={(e: Event) => {
                if (hasNavigation) {
                    navigate(url, {
                        state: navigationProps,
                    });
                }
                e.preventDefault();
            }}
        >
            {columns.map(({key, value}) => (
                <p key={key}>
                    <strong>{key}</strong>&nbsp;{value}
                </p>
            ))}
        </Container>
    );
};

export default Card;
