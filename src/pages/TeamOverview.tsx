import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import {useAppDispatch} from 'state/hooks';
import {setHeader} from 'state/slices/header';
import {useFetchTeamOverviewExQuery} from 'state/slices/team';
import Card from 'components/Card';
import {Container} from 'components/GlobalComponents';
import List from 'components/List';

const mapArray = (users: UserData[]) => {
    return users.map(u => {
        const columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};

const mapTLead = tlead => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${tlead.firstName} ${tlead.lastName}`,
        },
        {
            key: 'Display Name',
            value: tlead.displayName,
        },
        {
            key: 'Location',
            value: tlead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${tlead.id}`} navigationProps={tlead} />;
};

const TeamOverview = () => {
    const {state: {name}} = useLocation();
    const {teamId} = useParams();

    const dispatch = useAppDispatch();

    dispatch(setHeader({title: `Team ${name}`, showBackButton: true}));

    const {data: {teamLead, teamMembers = []} = {}, isFetching} = useFetchTeamOverviewExQuery(teamId);

    return (
        <Container>
            {!isFetching && mapTLead(teamLead)}
            <List items={mapArray(teamMembers)} isLoading={isFetching} />
        </Container>
    );
};

export default TeamOverview;
