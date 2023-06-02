import {useLocation} from 'react-router-dom';
import {UserData} from 'types';
import {useAppDispatch} from 'state/hooks';
import {setHeader} from 'state/slices/header';
import Card from 'components/Card';
import {Container} from 'components/GlobalComponents';
import {useEffect} from 'react';

const mapU = (user: UserData) => {
    const columns = [
        {
            key: 'Name',
            value: `${user.firstName} ${user.lastName}`,
        },
        {
            key: 'Display Name',
            value: user.displayName,
        },
        {
            key: 'Location',
            value: user.location,
        },
    ];

    return <Card columns={columns} hasNavigation={false} navigationProps={user} />;
};

const UserOverview = () => {
    const location = useLocation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setHeader({title: `User ${location.state.firstName} ${location.state.lastName}`, showBackButton: true}));
    });

    return (
        <Container>
            {mapU(location.state)}
        </Container>
    );
};

export default UserOverview;
